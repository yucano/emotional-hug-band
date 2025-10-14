import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Brain, Sparkles, Star, Lightbulb, Dumbbell, BookOpen, ExternalLink } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";

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

interface InterpretationCardProps {
  organName: string;
  organId: string;
  interpretationId: string;
  interpretation: Interpretation;
}

// Recomendaciones específicas por órgano
const organRecommendations: Record<string, {
  practices: string[];
  exercises: string[];
  resources: { title: string; url: string }[];
}> = {
  "Corazón": {
    practices: [
      "Practica la gratitud diaria escribiendo 3 cosas por las que estás agradecido",
      "Realiza actos de bondad sin esperar nada a cambio",
      "Cultiva relaciones auténticas y significativas",
    ],
    exercises: [
      "Meditación del amor compasivo (15 min diarios)",
      "Respiración 4-7-8 para calmar el corazón",
      "Yoga suave enfocado en aperturas de pecho",
    ],
    resources: [
      { title: "Guía de Meditación Cardíaca", url: "https://www.mindful.org/heart-meditation/" },
      { title: "Ejercicios de Coherencia Cardíaca", url: "https://www.heartmath.org/" },
    ],
  },
  "Pulmones": {
    practices: [
      "Pasa tiempo en la naturaleza respirando aire fresco",
      "Practica el perdón y libera resentimientos",
      "Expresa tus emociones de forma saludable",
    ],
    exercises: [
      "Respiración diafragmática profunda (10 min)",
      "Práctica de Pranayama (respiración alterna)",
      "Canto o vocalización para expandir capacidad pulmonar",
    ],
    resources: [
      { title: "Técnicas de Respiración Consciente", url: "https://www.breathwork.com/" },
    ],
  },
  "Hígado": {
    practices: [
      "Permite expresar y liberar la ira de forma constructiva",
      "Establece límites saludables en tus relaciones",
      "Practica la asertividad sin agresividad",
    ],
    exercises: [
      "Yoga de desintoxicación (torsiones suaves)",
      "Ejercicio físico moderado para liberar tensión",
      "Journaling para procesar emociones intensas",
    ],
    resources: [
      { title: "Sanación Emocional del Hígado", url: "https://www.tcmworld.org/liver-emotions/" },
    ],
  },
  "default": {
    practices: [
      "Mantén un diario emocional diario",
      "Practica la atención plena en actividades cotidianas",
      "Busca apoyo profesional si lo necesitas",
    ],
    exercises: [
      "Meditación mindfulness (20 min diarios)",
      "Ejercicio físico regular",
      "Técnicas de relajación progresiva",
    ],
    resources: [
      { title: "Recursos de Biodescodificación", url: "https://www.biodecodificacion.com/" },
    ],
  },
};

export const InterpretationCard = ({ 
  organName, 
  organId,
  interpretationId,
  interpretation 
}: InterpretationCardProps) => {
  const { isFavorite, toggleFavorite, loading } = useFavorites(interpretationId);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const recommendations = organRecommendations[organName] || organRecommendations.default;

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-card to-secondary/10">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[hsl(var(--healing))]" />
            <h3 className="text-2xl font-semibold">{organName}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(organId)}
            disabled={loading}
            className="gap-2"
          >
            <Star 
              className={`w-5 h-5 ${isFavorite ? "fill-[hsl(var(--healing))] text-[hsl(var(--healing))]" : ""}`} 
            />
            {isFavorite ? "Guardado" : "Guardar"}
          </Button>
        </div>
        <Badge variant="secondary" className="text-xs">
          {interpretation.fuente_manual}
        </Badge>
      </div>

      <div className="space-y-4">
        {interpretation.sentido_biologico && (
          <div className="space-y-2 bg-primary/5 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-primary">
              <Brain className="w-4 h-4" />
              <span className="text-sm font-semibold">Sentido Biológico</span>
              {interpretation.etapa_embrionaria && (
                <Badge variant="outline" className="ml-auto text-xs">
                  {interpretation.etapa_embrionaria}
                </Badge>
              )}
            </div>
            <p className="text-foreground leading-relaxed text-sm">
              {interpretation.sentido_biologico}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">Causa Probable</span>
          </div>
          <p className="text-foreground leading-relaxed pl-6">
            {interpretation.causa_probable}
          </p>
        </div>

        {interpretation.patron_emocional && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Patrón Emocional</span>
            </div>
            <p className="text-foreground leading-relaxed pl-6">
              {interpretation.patron_emocional}
            </p>
          </div>
        )}

        {interpretation.conflicto_adicional && (
          <div className="space-y-2 bg-secondary/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-foreground">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold">Conflictos Emocionales Profundos</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {interpretation.conflicto_adicional}
            </p>
          </div>
        )}

        <div className="space-y-2 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-[hsl(var(--healing))]">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Afirmación Positiva</span>
          </div>
          <p className="text-lg font-medium text-foreground italic pl-6 leading-relaxed">
            "{interpretation.afirmacion_positiva}"
          </p>
        </div>

        <Separator className="my-6" />

        {/* Recomendaciones y Ejercicios */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => setShowRecommendations(!showRecommendations)}
          >
            <Lightbulb className="w-4 h-4" />
            {showRecommendations ? "Ocultar" : "Ver"} Recomendaciones y Ejercicios
          </Button>

          {showRecommendations && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
              {/* Prácticas Recomendadas */}
              <div className="space-y-3 bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-primary">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-sm font-semibold">Prácticas Recomendadas</span>
                </div>
                <ul className="space-y-2 text-sm pl-6">
                  {recommendations.practices.map((practice, idx) => (
                    <li key={idx} className="list-disc text-foreground">
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ejercicios Sugeridos */}
              <div className="space-y-3 bg-[hsl(var(--healing))]/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-[hsl(var(--healing))]">
                  <Dumbbell className="w-4 h-4" />
                  <span className="text-sm font-semibold">Ejercicios Sugeridos</span>
                </div>
                <ul className="space-y-2 text-sm pl-6">
                  {recommendations.exercises.map((exercise, idx) => (
                    <li key={idx} className="list-disc text-foreground">
                      {exercise}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recursos Adicionales */}
              <div className="space-y-3 bg-secondary/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-semibold">Recursos Adicionales</span>
                </div>
                <div className="space-y-2">
                  {recommendations.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {resource.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
