import { useState, useEffect } from "react";

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

    const interval = setInterval(() => {
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
      analyzeBiometrics(newData);
    }, 2000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const analyzeBiometrics = (data: BiometricData) => {
    // Lógica para sugerir órganos basado en patrones biométricos
    if (data.heartRate > 85) {
      setSuggestedOrgan({
        organName: "Corazón",
        reason: "Frecuencia cardíaca elevada detectada",
        confidence: 75,
      });
    } else if (data.stressLevel > 70) {
      setSuggestedOrgan({
        organName: "Estómago",
        reason: "Nivel de estrés alto - posible tensión digestiva",
        confidence: 65,
      });
    } else if (data.gsr > 60 && data.hrv < 40) {
      setSuggestedOrgan({
        organName: "Garganta",
        reason: "Patrón de ansiedad comunicativa detectado",
        confidence: 60,
      });
    } else if (data.temperature > 36.8) {
      setSuggestedOrgan({
        organName: "Hígado",
        reason: "Temperatura elevada - posible proceso de desintoxicación",
        confidence: 55,
      });
    } else {
      setSuggestedOrgan(null);
    }
  };

  return { currentData, history, suggestedOrgan };
};
