import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Sparkles } from "lucide-react";

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
  interpretation: Interpretation;
}

export const InterpretationCard = ({ organName, interpretation }: InterpretationCardProps) => {
  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-card to-secondary/10">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[hsl(var(--healing))]" />
          <h3 className="text-2xl font-semibold">{organName}</h3>
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
      </div>
    </Card>
  );
};
