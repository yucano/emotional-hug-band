import { memo } from "react";
import { BodyMap as BodyMapOriginal } from "./BodyMap";

interface Organ {
  id: string;
  nombre: string;
  zona_principal: string;
  coordenada_x: number;
  coordenada_y: number;
  radio_deteccion: number;
}

interface BodyMapProps {
  organs: Organ[];
  onOrganSelect: (organ: Organ) => void;
  selectedOrgan?: Organ | null;
  suggestedOrgan?: string | null;
  stressLevel?: number;
}

// Optimización con React.memo
export const BodyMap = memo(BodyMapOriginal, (prevProps: BodyMapProps, nextProps: BodyMapProps) => {
  // Solo re-renderizar si cambian órganos, selección, sugerencia o nivel de estrés
  return (
    prevProps.organs.length === nextProps.organs.length &&
    prevProps.selectedOrgan?.id === nextProps.selectedOrgan?.id &&
    prevProps.suggestedOrgan === nextProps.suggestedOrgan &&
    Math.abs((prevProps.stressLevel || 0) - (nextProps.stressLevel || 0)) < 5 // Tolerancia de 5 puntos
  );
});

BodyMap.displayName = 'BodyMap';
