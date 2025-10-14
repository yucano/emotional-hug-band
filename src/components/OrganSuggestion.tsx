import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Target } from "lucide-react";
import { SuggestedOrgan } from "@/hooks/useBiometrics";

interface OrganSuggestionProps {
  suggestion: SuggestedOrgan | null;
  onSelectOrgan: (organName: string) => void;
  isConnected: boolean;
}

export const OrganSuggestion = ({ suggestion, onSelectOrgan, isConnected }: OrganSuggestionProps) => {
  if (!isConnected || !suggestion) {
    return null;
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "bg-green-500/10 text-green-500 border-green-500/20";
    if (confidence >= 50) return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    return "bg-orange-500/10 text-orange-500 border-orange-500/20";
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/10 via-[hsl(var(--healing))]/10 to-secondary/10 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-semibold">Sugerencia de Revisión</h3>
              <Badge variant="outline" className={getConfidenceColor(suggestion.confidence)}>
                {suggestion.confidence}% confianza
              </Badge>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-medium text-primary">{suggestion.organName}</span>
              </div>
              <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
            </div>

            <Button
              onClick={() => onSelectOrgan(suggestion.organName)}
              size="sm"
              className="mt-2"
            >
              Revisar {suggestion.organName}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
