import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BiometricData } from "./useBiometrics";

interface AlertConfig {
  umbral_heart_rate_max: number;
  umbral_heart_rate_min: number;
  umbral_stress_level: number;
  umbral_hrv_min: number;
  alertas_habilitadas: boolean;
}

const DEFAULT_CONFIG: AlertConfig = {
  umbral_heart_rate_max: 120,
  umbral_heart_rate_min: 50,
  umbral_stress_level: 80,
  umbral_hrv_min: 20,
  alertas_habilitadas: true,
};

export const useAlerts = () => {
  const [config, setConfig] = useState<AlertConfig>(DEFAULT_CONFIG);
  const alertCooldowns = useRef<Map<string, number>>(new Map());
  const COOLDOWN_MS = 60000; // 1 minuto entre alertas del mismo tipo

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("alertas_config")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setConfig(data);
      } else {
        // Create default config
        const { error: insertError } = await supabase
          .from("alertas_config")
          .insert({
            user_id: user.id,
            ...DEFAULT_CONFIG,
          });
        
        if (insertError) throw insertError;
      }
    } catch (error: any) {
      console.error("Error loading alerts config:", error);
    }
  };

  const canShowAlert = (alertType: string): boolean => {
    const lastShown = alertCooldowns.current.get(alertType) || 0;
    const now = Date.now();
    
    if (now - lastShown < COOLDOWN_MS) {
      return false;
    }
    
    alertCooldowns.current.set(alertType, now);
    return true;
  };

  const checkAlerts = (data: BiometricData | null) => {
    if (!data || !config.alertas_habilitadas) return;

    // High heart rate alert
    if (data.heartRate > config.umbral_heart_rate_max && canShowAlert("high_hr")) {
      toast.error(`⚠️ Frecuencia cardíaca elevada: ${data.heartRate} BPM`, {
        description: "Considera realizar ejercicios de respiración profunda",
      });
    }

    // Low heart rate alert
    if (data.heartRate < config.umbral_heart_rate_min && canShowAlert("low_hr")) {
      toast.warning(`⚠️ Frecuencia cardíaca baja: ${data.heartRate} BPM`, {
        description: "Si persiste, consulta con un médico",
      });
    }

    // High stress alert
    if (data.stressLevel > config.umbral_stress_level && canShowAlert("high_stress")) {
      toast.error(`🧘 Nivel de estrés elevado: ${data.stressLevel}%`, {
        description: "Toma un descanso y practica técnicas de relajación",
      });
    }

    // Low HRV alert (indicador de estrés)
    if (data.hrv < config.umbral_hrv_min && canShowAlert("low_hrv")) {
      toast.warning(`💙 HRV bajo detectado: ${data.hrv} ms`, {
        description: "Tu cuerpo podría necesitar más descanso",
      });
    }
  };

  const updateConfig = async (newConfig: Partial<AlertConfig>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("alertas_config")
        .update(newConfig)
        .eq("user_id", user.id);

      if (error) throw error;
      
      setConfig((prev) => ({ ...prev, ...newConfig }));
      toast.success("Configuración de alertas actualizada");
    } catch (error: any) {
      console.error("Error updating alerts config:", error);
      toast.error("Error al actualizar configuración");
    }
  };

  return { config, checkAlerts, updateConfig };
};
