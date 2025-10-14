import { memo } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BiometricData } from "@/hooks/useBiometrics";

interface BiometricChartsProps {
  history: BiometricData[];
  isConnected: boolean;
}

const BiometricChartsComponent = ({ history, isConnected }: BiometricChartsProps) => {
  if (!isConnected || history.length === 0) {
    return null;
  }

  const chartData = history.map((data, index) => ({
    name: index.toString(),
    heartRate: data.heartRate,
    stress: data.stressLevel,
    hrv: data.hrv,
  }));

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary/5">
      <h3 className="text-lg font-semibold mb-4">Monitoreo en Tiempo Real</h3>
      
      <div className="space-y-6">
        {/* Heart Rate Chart */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Frecuencia Cardíaca (últimos 60 seg)</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" hide />
              <YAxis domain={[50, 100]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="heartRate"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                dot={false}
                name="BPM"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stress Level Chart */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Nivel de Estrés (últimos 60 seg)</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" hide />
              <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="stress"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                name="Estrés %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* HRV Chart */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Variabilidad Cardíaca (últimos 60 seg)</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" hide />
              <YAxis domain={[20, 80]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="hrv"
                stroke="hsl(var(--calm))"
                strokeWidth={2}
                dot={false}
                name="HRV ms"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

// Optimización con React.memo
export const BiometricCharts = memo(BiometricChartsComponent, (prevProps, nextProps) => {
  // Solo re-renderizar si cambia el estado de conexión o el tamaño del historial
  return (
    prevProps.isConnected === nextProps.isConnected &&
    prevProps.history.length === nextProps.history.length &&
    prevProps.history[prevProps.history.length - 1]?.timestamp === 
    nextProps.history[nextProps.history.length - 1]?.timestamp
  );
});

BiometricCharts.displayName = 'BiometricCharts';
