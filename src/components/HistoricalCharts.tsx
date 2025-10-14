import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { HistoricalReading } from "@/hooks/useHistoricalData";
import { format } from "date-fns";

interface HistoricalChartsProps {
  readings: HistoricalReading[];
  timeRange: string;
}

export const HistoricalCharts = ({ readings, timeRange }: HistoricalChartsProps) => {
  if (readings.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No hay datos históricos para mostrar en este rango</p>
      </Card>
    );
  }

  const chartData = readings.map((reading) => ({
    timestamp: format(new Date(reading.timestamp), timeRange === "day" ? "HH:mm" : "dd/MM"),
    heartRate: reading.heart_rate,
    stress: reading.stress_level,
    hrv: reading.hrv,
    temperature: reading.temperature,
  }));

  return (
    <div className="space-y-6">
      {/* Heart Rate & Stress Chart */}
      <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
        <h3 className="text-lg font-semibold mb-4">Frecuencia Cardíaca & Nivel de Estrés</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="timestamp" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="heartRate"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorHeartRate)"
              name="BPM"
            />
            <Area
              type="monotone"
              dataKey="stress"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorStress)"
              name="Estrés %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* HRV Chart */}
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/5">
        <h3 className="text-lg font-semibold mb-4">Variabilidad Cardíaca (HRV)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="timestamp" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
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
      </Card>

      {/* Temperature Chart */}
      <Card className="p-6 bg-gradient-to-br from-card to-[hsl(var(--healing))]/10">
        <h3 className="text-lg font-semibold mb-4">Temperatura Corporal</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="timestamp" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[36, 37.5]}
              stroke="hsl(var(--muted-foreground))" 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
              name="Temp °C"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
