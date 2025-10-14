import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface BiometricData {
  heartRate: number;
  hrv: number; // Heart Rate Variability
  temperature: number;
  gsr: number; // Galvanic Skin Response
  stressLevel: number; // 0-100
  timestamp: number;
}

export interface SuggestedOrgan {
  organName: string;
  reason: string;
  confidence: number; // 0-100
}

export const useBiometrics = (isConnected: boolean) => {
  const [currentData, setCurrentData] = useState<BiometricData>({
    heartRate: 72,
    hrv: 50,
    temperature: 36.5,
    gsr: 50,
    stressLevel: 30,
    timestamp: Date.now(),
  });

  const [history, setHistory] = useState<BiometricData[]>([]);
  const [suggestedOrgan, setSuggestedOrgan] = useState<SuggestedOrgan | null>(null);

  useEffect(() => {
    if (!isConnected) {
      setHistory([]);
      setSuggestedOrgan(null);
      return;
    }

    const interval = setInterval(async () => {
      const newData: BiometricData = {
        heartRate: Math.round(65 + Math.random() * 20 + Math.sin(Date.now() / 3000) * 10),
        hrv: Math.round(40 + Math.random() * 30),
        temperature: Number((36.3 + Math.random() * 0.6).toFixed(1)),
        gsr: Math.round(30 + Math.random() * 40),
        stressLevel: Math.round(20 + Math.random() * 60),
        timestamp: Date.now(),
      };

      setCurrentData(newData);
      setHistory((prev) => [...prev.slice(-29), newData]); // Keep last 30 readings

      // Analizar datos y sugerir órgano
      const suggestion = analyzeBiometrics(newData);
      
      // Guardar lectura en la base de datos (cada 10 segundos para no saturar)
      if (Math.random() < 0.2) { // 20% de probabilidad = ~cada 10 seg
        await saveBiometricReading(newData, suggestion);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const analyzeBiometrics = (data: BiometricData): SuggestedOrgan | null => {
    let suggestion: SuggestedOrgan | null = null;
    
    // Lógica para sugerir órganos basado en patrones biométricos
    if (data.heartRate > 85) {
      suggestion = {
        organName: "Corazón",
        reason: "Frecuencia cardíaca elevada detectada",
        confidence: 75,
      };
    } else if (data.stressLevel > 70) {
      suggestion = {
        organName: "Estómago",
        reason: "Nivel de estrés alto - posible tensión digestiva",
        confidence: 65,
      };
    } else if (data.gsr > 60 && data.hrv < 40) {
      suggestion = {
        organName: "Garganta",
        reason: "Patrón de ansiedad comunicativa detectado",
        confidence: 60,
      };
    } else if (data.temperature > 36.8) {
      suggestion = {
        organName: "Hígado",
        reason: "Temperatura elevada - posible proceso de desintoxicación",
        confidence: 55,
      };
    }
    
    setSuggestedOrgan(suggestion);
    return suggestion;
  };

  const saveBiometricReading = async (data: BiometricData, suggestion: SuggestedOrgan | null) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from("lecturas_biometricas").insert({
        user_id: user.id,
        heart_rate: data.heartRate,
        hrv: data.hrv,
        temperature: data.temperature,
        gsr: data.gsr,
        stress_level: data.stressLevel,
        organo_sugerido_nombre: suggestion?.organName || null,
        organo_sugerido_razon: suggestion?.reason || null,
        organo_sugerido_confianza: suggestion?.confidence || null,
      });
    } catch (error) {
      console.error("Error guardando lectura biométrica:", error);
    }
  };

  return { currentData, history, suggestedOrgan };
};
