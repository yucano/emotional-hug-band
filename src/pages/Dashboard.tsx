import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BodyMap } from "@/components/BodyMap";
import { useOrgans, useInterpretaciones } from "@/hooks/useOrgans";
import { Loader2, LogOut, Bluetooth } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [selectedOrganId, setSelectedOrganId] = useState<string>();
  const [bleSensorData, setBleSensorData] = useState<any>(null);
  
  const { data: organs, isLoading: organsLoading } = useOrgans();
  const { data: interpretaciones, isLoading: interpretacionesLoading } = useInterpretaciones(selectedOrganId);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleOrganClick = (organ: any) => {
    setSelectedOrganId(organ.id);
    toast.success(`Órgano seleccionado: ${organ.nombre}`);
  };

  const simulateBLEData = () => {
    const zonas = ["CABEZA", "GARGANTA", "PECHO", "PLEXO", "EXTREMIDADES"];
    const zona = zonas[Math.floor(Math.random() * zonas.length)];
    setBleSensorData({
      zona,
      tipo: "presion",
      duracion: Math.floor(Math.random() * 3000) + 500,
      timestamp: new Date().toISOString(),
    });
    toast.info(`Datos BLE recibidos: ${zona}`);
  };

  if (!user || organsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const selectedOrgan = organs?.find(o => o.id === selectedOrganId);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Biodecodificador Emocional</h1>
            <p className="text-muted-foreground">Bienvenido, {user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={simulateBLEData}>
              <Bluetooth className="mr-2 h-4 w-4" />
              Simular BLE
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mapa Corporal</CardTitle>
              <CardDescription>
                Selecciona un órgano para ver su interpretación biodecodificada
              </CardDescription>
            </CardHeader>
            <CardContent>
              {organs && (
                <BodyMap
                  organs={organs}
                  onOrganClick={handleOrganClick}
                  selectedOrganId={selectedOrganId}
                />
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            {bleSensorData && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Datos del Sensor BLE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Zona:</strong> {bleSensorData.zona}</p>
                    <p><strong>Tipo:</strong> {bleSensorData.tipo}</p>
                    <p><strong>Duración:</strong> {bleSensorData.duracion}ms</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedOrgan && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedOrgan.nombre}</CardTitle>
                  <CardDescription>{selectedOrgan.zona_principal}</CardDescription>
                </CardHeader>
                <CardContent>
                  {interpretacionesLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : interpretaciones && interpretaciones.length > 0 ? (
                    <div className="space-y-4">
                      {interpretaciones.map((interp) => (
                        <div key={interp.id} className="space-y-2">
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground">Causa Probable</h4>
                            <p className="text-sm">{interp.causa_probable}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground">Patrón Emocional</h4>
                            <p className="text-sm">{interp.patron_emocional}</p>
                          </div>
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <h4 className="font-semibold text-sm mb-1">✨ Afirmación Positiva</h4>
                            <p className="text-sm italic">{interp.afirmacion_positiva}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No hay interpretaciones disponibles</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
