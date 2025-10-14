import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface HistoricalReading {
  id: string;
  timestamp: string;
  heart_rate: number;
  hrv: number;
  temperature: number;
  gsr: number;
  stress_level: number;
  organo_sugerido_nombre: string | null;
  organo_sugerido_razon: string | null;
  organo_sugerido_confianza: number | null;
}

export interface Stats {
  avgHeartRate: number;
  avgStressLevel: number;
  avgHrv: number;
  maxStressLevel: number;
  minHrv: number;
  totalReadings: number;
  topOrgan: { name: string; count: number } | null;
}

export const useHistoricalData = (timeRange: "day" | "week" | "month" | "all") => {
  const [readings, setReadings] = useState<HistoricalReading[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistoricalData();
  }, [timeRange]);

  const loadHistoricalData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Calcular fecha de inicio según el rango
      const now = new Date();
      let startDate = new Date();
      
      switch (timeRange) {
        case "day":
          startDate.setDate(now.getDate() - 1);
          break;
        case "week":
          startDate.setDate(now.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(now.getMonth() - 1);
          break;
        case "all":
          startDate = new Date(0); // Desde el inicio
          break;
      }

      const { data, error } = await supabase
        .from("lecturas_biometricas")
        .select("*")
        .eq("user_id", user.id)
        .gte("timestamp", startDate.toISOString())
        .order("timestamp", { ascending: true });

      if (error) throw error;

      setReadings(data || []);
      calculateStats(data || []);
    } catch (error: any) {
      console.error("Error cargando datos históricos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: HistoricalReading[]) => {
    if (data.length === 0) {
      setStats(null);
      return;
    }

    const avgHeartRate = data.reduce((sum, r) => sum + r.heart_rate, 0) / data.length;
    const avgStressLevel = data.reduce((sum, r) => sum + r.stress_level, 0) / data.length;
    const avgHrv = data.reduce((sum, r) => sum + r.hrv, 0) / data.length;
    const maxStressLevel = Math.max(...data.map(r => r.stress_level));
    const minHrv = Math.min(...data.map(r => r.hrv));

    // Calcular órgano más sugerido
    const organCounts: { [key: string]: number } = {};
    data.forEach(r => {
      if (r.organo_sugerido_nombre) {
        organCounts[r.organo_sugerido_nombre] = (organCounts[r.organo_sugerido_nombre] || 0) + 1;
      }
    });

    let topOrgan = null;
    if (Object.keys(organCounts).length > 0) {
      const topOrganName = Object.keys(organCounts).reduce((a, b) => 
        organCounts[a] > organCounts[b] ? a : b
      );
      topOrgan = { name: topOrganName, count: organCounts[topOrganName] };
    }

    setStats({
      avgHeartRate: Math.round(avgHeartRate),
      avgStressLevel: Math.round(avgStressLevel),
      avgHrv: Math.round(avgHrv),
      maxStressLevel,
      minHrv,
      totalReadings: data.length,
      topOrgan,
    });
  };

  return { readings, stats, loading, refresh: loadHistoricalData };
};
