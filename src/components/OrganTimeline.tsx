import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HistoricalReading } from "@/hooks/useHistoricalData";
import { format } from "date-fns";
import { Target, TrendingUp } from "lucide-react";

interface OrganTimelineProps {
  readings: HistoricalReading[];
}

export const OrganTimeline = ({ readings }: OrganTimelineProps) => {
  // Filtrar solo lecturas con órgano sugerido
  const suggestionsOnly = readings.filter(r => r.organo_sugerido_nombre);

  if (suggestionsOnly.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Target className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">No hay sugerencias de órganos en este período</p>
      </Card>
    );
  }

  // Agrupar por órgano para mostrar frecuencia
  const organCounts: { [key: string]: number } = {};
  suggestionsOnly.forEach(r => {
    if (r.organo_sugerido_nombre) {
      organCounts[r.organo_sugerido_nombre] = (organCounts[r.organo_sugerido_nombre] || 0) + 1;
    }
  });

  const sortedOrgans = Object.entries(organCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => ({ name, count }));

  return (
    <div className="space-y-6">
      {/* Resumen de órganos más sugeridos */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 via-[hsl(var(--healing))]/10 to-secondary/10">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Órganos Más Frecuentes</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {sortedOrgans.slice(0, 5).map(({ name, count }) => (
            <Badge 
              key={name}
              variant="outline" 
              className="bg-primary/10 text-primary border-primary/20 px-3 py-1"
            >
              {name} <span className="ml-2 text-xs opacity-70">×{count}</span>
            </Badge>
          ))}
        </div>
      </Card>

      {/* Timeline de sugerencias */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Timeline de Sugerencias</h3>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {suggestionsOnly.slice().reverse().slice(0, 20).map((reading) => (
            <div 
              key={reading.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-primary">
                    {reading.organo_sugerido_nombre}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(reading.timestamp), "dd/MM/yyyy HH:mm")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {reading.organo_sugerido_razon}
                </p>
                {reading.organo_sugerido_confianza && (
                  <Badge 
                    variant="outline" 
                    className={
                      reading.organo_sugerido_confianza >= 70 
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : reading.organo_sugerido_confianza >= 50
                        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                    }
                  >
                    {reading.organo_sugerido_confianza}% confianza
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
