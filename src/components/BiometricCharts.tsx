import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BiometricData } from "@/hooks/useBiometrics";

interface BiometricChartsProps {
  history: BiometricData[];
  isConnected: boolean;
}

export const BiometricCharts = ({ history, isConnected }: BiometricChartsProps) => {
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
                stroke="#ef4444"
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
                stroke="#8b5cf6"
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
                stroke="#3b82f6"
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
