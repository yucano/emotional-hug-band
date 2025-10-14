import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-primary/5 p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--healing))] flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-[hsl(var(--healing))] bg-clip-text text-transparent">
            Biodecodificador Emocional
          </h1>
          <p className="text-muted-foreground">
            Conecta con tu cuerpo y emociones
          </p>
        </div>

        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "hsl(var(--primary))",
                  brandAccent: "hsl(var(--primary))",
                },
              },
            },
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: "Correo electrónico",
                password_label: "Contraseña",
                button_label: "Iniciar sesión",
                loading_button_label: "Iniciando sesión...",
                link_text: "¿Ya tienes cuenta? Inicia sesión",
              },
              sign_up: {
                email_label: "Correo electrónico",
                password_label: "Contraseña",
                button_label: "Registrarse",
                loading_button_label: "Registrando...",
                link_text: "¿No tienes cuenta? Regístrate",
              },
            },
          }}
        />
      </Card>
    </div>
  );
};

export default Auth;
