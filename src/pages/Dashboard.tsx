import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BodyMap } from "@/components/BodyMap";
import { InterpretationCard } from "@/components/InterpretationCard";
import { BiometricPanel } from "@/components/BiometricPanel";
import { BiometricCharts } from "@/components/BiometricCharts";
import { OrganSuggestion } from "@/components/OrganSuggestion";
import { useBiometrics } from "@/hooks/useBiometrics";
import { LogOut, Bluetooth, Activity, TrendingUp, History as HistoryIcon } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Organ {
  id: string;
  nombre: string;
  zona_principal: string;
  coordenada_x: number;
  coordenada_y: number;
  radio_deteccion: number;
}

interface Interpretation {
  sintoma: string;
  causa_probable: string;
  patron_emocional: string;
  afirmacion_positiva: string;
  fuente_manual: string;
  sentido_biologico?: string;
  etapa_embrionaria?: string;
  conflicto_adicional?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [selectedOrgan, setSelectedOrgan] = useState<Organ | null>(null);
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { currentData, history, suggestedOrgan } = useBiometrics(isConnected);

  useEffect(() => {
    checkUser();
    loadOrgans();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const loadOrgans = async () => {
    try {
      const { data, error } = await supabase
        .from("organos")
        .select("*")
        .order("nombre");

      if (error) throw error;
      setOrgans(data || []);
    } catch (error: any) {
      toast.error("Error al cargar órganos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOrganSelect = async (organ: Organ) => {
    setSelectedOrgan(organ);
    
    try {
      const { data, error } = await supabase
        .from("interpretaciones")
        .select("*")
        .eq("organo_id", organ.id)
        .limit(1)
        .single();

      if (error) throw error;
      setInterpretation(data);
      
      // Guardar lectura
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("lecturas_sensor").insert({
          user_id: user.id,
          zona_ble: organ.zona_principal,
          organo_detectado_id: organ.id,
          tipo_toque: "manual",
        });
      }
    } catch (error: any) {
      toast.error("Error al cargar interpretación: " + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const simulateBLEConnection = () => {
    const newStatus = !isConnected;
    setIsConnected(newStatus);
    toast.success(
      newStatus 
        ? "🔗 Pulsera Lumen conectada - Iniciando monitoreo biométrico" 
        : "Pulsera desconectada"
    );
  };

  const handleSuggestedOrgan = (organName: string) => {
    const organ = organs.find(o => o.nombre === organName);
    if (organ) {
      handleOrganSelect(organ);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--healing))] flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Lumen</h1>
              <p className="text-xs text-muted-foreground">Biodecodificación Emocional</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/history")}
              className="gap-2"
            >
              <HistoryIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Historial</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={simulateBLEConnection}
              className="gap-2"
            >
              <Bluetooth className="w-4 h-4" />
              {isConnected ? (
                <Badge variant="default" className="bg-[hsl(var(--healing))]">
                  Conectado
                </Badge>
              ) : (
                <span>Conectar</span>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Body Map */}
          <div className="lg:col-span-1 space-y-6">
            <BodyMap
              organs={organs}
              onOrganSelect={handleOrganSelect}
              selectedOrgan={selectedOrgan}
              suggestedOrgan={suggestedOrgan?.organName}
              stressLevel={currentData?.stressLevel}
            />
            
            <OrganSuggestion
              suggestion={suggestedOrgan}
              onSelectOrgan={handleSuggestedOrgan}
              isConnected={isConnected}
            />
          </div>

          {/* Middle Column - Interpretation */}
          <div className="lg:col-span-1">
            {selectedOrgan && interpretation ? (
              <InterpretationCard
                organName={selectedOrgan.nombre}
                organId={selectedOrgan.id}
                interpretationId={(interpretation as any).id}
                interpretation={interpretation}
                biometrics={currentData}
              />
            ) : (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
                    <Activity className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Selecciona un órgano
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Haz clic en cualquier punto del mapa corporal para ver su interpretación emocional
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Biometric Data */}
          <div className="lg:col-span-1 space-y-6">
            {isConnected ? (
              <Tabs defaultValue="live" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="live">
                    <Activity className="w-4 h-4 mr-2" />
                    En Vivo
                  </TabsTrigger>
                  <TabsTrigger value="charts">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Gráficos
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="live" className="space-y-6 mt-6">
                  <BiometricPanel data={currentData} isConnected={isConnected} />
                </TabsContent>
                
                <TabsContent value="charts" className="space-y-6 mt-6">
                  <BiometricCharts history={history} isConnected={isConnected} />
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
                    <Bluetooth className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Conecta tu Pulsera Lumen
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Activa la conexión para comenzar el monitoreo biométrico en tiempo real
                    </p>
                    <Button onClick={simulateBLEConnection} className="gap-2">
                      <Bluetooth className="w-4 h-4" />
                      Conectar Ahora
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
