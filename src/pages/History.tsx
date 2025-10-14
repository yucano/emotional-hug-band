import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/StatsCard";
import { HistoricalCharts } from "@/components/HistoricalCharts";
import { OrganTimeline } from "@/components/OrganTimeline";
import { useHistoricalData } from "@/hooks/useHistoricalData";
import { ArrowLeft, Heart, Brain, Activity, TrendingUp, Target, BarChart3 } from "lucide-react";

const History = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "all">("week");
  const { readings, stats, loading } = useHistoricalData(timeRange);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-primary/5">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-xl font-bold">Historial & Análisis</h1>
            <p className="text-xs text-muted-foreground">Seguimiento de tu progreso biométrico</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Time Range Selector */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={timeRange === "day" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("day")}
            >
              Último Día
            </Button>
            <Button
              variant={timeRange === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("week")}
            >
              Última Semana
            </Button>
            <Button
              variant={timeRange === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("month")}
            >
              Último Mes
            </Button>
            <Button
              variant={timeRange === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("all")}
            >
              Todo el Historial
            </Button>
          </div>
        </Card>

        {stats ? (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <StatsCard
                title="Frecuencia Cardíaca Promedio"
                value={`${stats.avgHeartRate} BPM`}
                icon={Heart}
                iconColor="bg-red-500/10 text-red-500"
              />
              <StatsCard
                title="Nivel de Estrés Promedio"
                value={`${stats.avgStressLevel}%`}
                subtitle={`Máximo: ${stats.maxStressLevel}%`}
                icon={Brain}
                iconColor="bg-purple-500/10 text-purple-500"
              />
              <StatsCard
                title="HRV Promedio"
                value={`${stats.avgHrv} ms`}
                subtitle={`Mínimo: ${stats.minHrv} ms`}
                icon={Activity}
                iconColor="bg-blue-500/10 text-blue-500"
              />
              <StatsCard
                title="Total de Lecturas"
                value={stats.totalReadings}
                icon={BarChart3}
                iconColor="bg-green-500/10 text-green-500"
              />
              {stats.topOrgan && (
                <StatsCard
                  title="Órgano Más Sugerido"
                  value={stats.topOrgan.name}
                  subtitle={`${stats.topOrgan.count} veces`}
                  icon={Target}
                  iconColor="bg-primary/10 text-primary"
                />
              )}
            </div>

            {/* Charts & Timeline Tabs */}
            <Tabs defaultValue="charts" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="charts">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Gráficos
                </TabsTrigger>
                <TabsTrigger value="timeline">
                  <Target className="w-4 h-4 mr-2" />
                  Órganos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="charts" className="mt-6">
                <HistoricalCharts readings={readings} timeRange={timeRange} />
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <OrganTimeline readings={readings} />
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <Card className="p-12 text-center">
            <Activity className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No hay datos históricos
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Conecta tu pulsera Lumen y comienza a registrar lecturas para ver tu progreso
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Ir al Dashboard
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
};

export default History;
