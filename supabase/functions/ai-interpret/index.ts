import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { organo_id, biometrics } = await req.json();

    // RAG: fetch organ + interpretation data
    const { data: organ } = await supabase
      .from("organos")
      .select("*")
      .eq("id", organo_id)
      .single();

    const { data: interpretations } = await supabase
      .from("interpretaciones")
      .select("*")
      .eq("organo_id", organo_id);

    if (!organ) {
      return new Response(JSON.stringify({ error: "Organ not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const context = interpretations?.map((i: any) => 
      `Síntoma: ${i.sintoma}\nCausa probable: ${i.causa_probable}\nPatrón emocional: ${i.patron_emocional || "N/A"}\nSentido biológico: ${i.sentido_biologico || "N/A"}\nEtapa embrionaria: ${i.etapa_embrionaria || "N/A"}\nConflicto adicional: ${i.conflicto_adicional || "N/A"}\nAfirmación positiva: ${i.afirmacion_positiva}`
    ).join("\n---\n") || "Sin interpretaciones disponibles";

    const biometricsText = biometrics
      ? `Datos biométricos actuales del usuario:\n- Frecuencia cardíaca: ${biometrics.heartRate} bpm\n- Variabilidad cardíaca (HRV): ${biometrics.hrv}\n- Temperatura: ${biometrics.temperature}°C\n- Respuesta galvánica (GSR): ${biometrics.gsr}\n- Nivel de estrés: ${biometrics.stressLevel}/100`
      : "No hay datos biométricos disponibles en este momento.";

    const systemPrompt = `Eres un experto en bioneuroemoción y biodescodificación emocional del Proyecto Lumen. 
Tu rol es analizar la información del órgano seleccionado junto con los datos biométricos del usuario para ofrecer una interpretación emocional profunda y personalizada.

REGLAS:
- Responde SIEMPRE en español
- Sé empático, cálido y profesional
- Basa tu análisis en la biodescodificación (Louise Hay, Enrique Bouron, Christian Flèche)
- Si hay datos biométricos, correlaciónalos con el estado emocional
- Ofrece una afirmación positiva personalizada al final
- NO des diagnósticos médicos, solo interpretaciones emocionales
- Mantén la respuesta concisa (máximo 300 palabras)

FORMATO de respuesta:
🔍 **Análisis Emocional**: [interpretación principal]
🧬 **Conexión Biológica**: [relación órgano-emoción]
💓 **Lectura Biométrica**: [si hay datos, interpretación del estado actual]
🌱 **Recomendación**: [práctica o ejercicio sugerido]
✨ **Afirmación Personalizada**: [afirmación positiva adaptada]`;

    const userPrompt = `ÓRGANO: ${organ.nombre} (${organ.zona_principal}, Sistema: ${organ.sistema_corporal || "N/A"})
${organ.descripcion ? `Descripción: ${organ.descripcion}` : ""}

BASE DE CONOCIMIENTO (Biodescodificación):
${context}

${biometricsText}

Por favor, genera una interpretación emocional profunda y personalizada para este órgano considerando toda la información disponible.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Límite de solicitudes excedido. Intenta de nuevo en unos minutos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos de IA agotados." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Error en el servicio de IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-interpret error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
