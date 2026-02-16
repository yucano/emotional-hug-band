import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { BiometricData } from "./useBiometrics";

export const useAIInterpretation = () => {
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const interpret = useCallback(async (organId: string, biometrics?: BiometricData | null) => {
    setIsLoading(true);
    setAiResponse("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Debes iniciar sesión");
        return;
      }

      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-interpret`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ organo_id: organId, biometrics }),
        }
      );

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Error desconocido" }));
        toast.error(err.error || "Error al interpretar con IA");
        setIsLoading(false);
        return;
      }

      const reader = resp.body?.getReader();
      if (!reader) throw new Error("No stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              full += content;
              setAiResponse(full);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error("AI interpretation error:", e);
      toast.error("Error al conectar con la IA");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => setAiResponse(""), []);

  return { aiResponse, isLoading, interpret, clear };
};
