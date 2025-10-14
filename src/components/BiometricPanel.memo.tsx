import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Activity, Thermometer, Zap, Brain } from "lucide-react";
import { BiometricData } from "@/hooks/useBiometrics";

interface BiometricPanelProps {
  data: BiometricData;
  isConnected: boolean;
}

const BiometricPanelComponent = ({ data, isConnected }: BiometricPanelProps) => {
  if (!isConnected) {
    return null;
  }

  const getStressColor = (level: number) => {
    if (level < 30) return "text-[hsl(var(--healing))]";
    if (level < 60) return "text-[hsl(var(--energy))]";
    return "text-destructive";
  };

  const getStressLabel = (level: number) => {
    if (level < 30) return "Relajado";
    if (level < 60) return "Moderado";
    return "Elevado";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Datos Biométricos</h3>
          <Badge variant="outline" className="bg-[hsl(var(--healing))]/10 text-[hsl(var(--healing))] border-[hsl(var(--healing))]/20">
            <span className="w-2 h-2 bg-[hsl(var(--healing))] rounded-full mr-2 animate-pulse"></span>
            En vivo
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Heart Rate */}
          <div className="space-y-2 p-4 rounded-lg bg-background/50">
            <div className="flex items-center gap-2 text-destructive">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-medium">Frecuencia Cardíaca</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{data.heartRate}</span>
              <span className="text-xs text-muted-foreground">bpm</span>
            </div>
          </div>

          {/* HRV */}
          <div className="space-y-2 p-4 rounded-lg bg-background/50">
            <div className="flex items-center gap-2 text-[hsl(var(--calm))]">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-medium">HRV</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{data.hrv}</span>
              <span className="text-xs text-muted-foreground">ms</span>
            </div>
          </div>

          {/* Temperature */}
          <div className="space-y-2 p-4 rounded-lg bg-background/50">
            <div className="flex items-center gap-2 text-[hsl(var(--energy))]">
              <Thermometer className="w-4 h-4" />
              <span className="text-xs font-medium">Temperatura</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{data.temperature}</span>
              <span className="text-xs text-muted-foreground">°C</span>
            </div>
          </div>

          {/* GSR */}
          <div className="space-y-2 p-4 rounded-lg bg-background/50">
            <div className="flex items-center gap-2 text-primary">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-medium">GSR</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{data.gsr}</span>
              <span className="text-xs text-muted-foreground">µS</span>
            </div>
          </div>
        </div>

        {/* Stress Level */}
        <div className="p-4 rounded-lg bg-background/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className={`w-4 h-4 ${getStressColor(data.stressLevel)}`} />
              <span className="text-sm font-medium">Nivel de Estrés</span>
            </div>
            <Badge variant="outline" className={getStressColor(data.stressLevel)}>
              {getStressLabel(data.stressLevel)}
            </Badge>
          </div>
          
          <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                data.stressLevel < 30
                  ? "bg-[hsl(var(--healing))]"
                  : data.stressLevel < 60
                  ? "bg-[hsl(var(--energy))]"
                  : "bg-destructive"
              }`}
              style={{ width: `${data.stressLevel}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

// Optimización con React.memo para evitar re-renders innecesarios
export const BiometricPanel = memo(BiometricPanelComponent, (prevProps, nextProps) => {
  // Solo re-renderizar si los datos biométricos cambian significativamente
  return (
    prevProps.isConnected === nextProps.isConnected &&
    prevProps.data.heartRate === nextProps.data.heartRate &&
    prevProps.data.hrv === nextProps.data.hrv &&
    prevProps.data.temperature === nextProps.data.temperature &&
    prevProps.data.gsr === nextProps.data.gsr &&
    prevProps.data.stressLevel === nextProps.data.stressLevel
  );
});

BiometricPanel.displayName = 'BiometricPanel';
