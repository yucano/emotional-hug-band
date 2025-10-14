import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
}

export const BodyMap = ({ organs, onOrganSelect, selectedOrgan }: BodyMapProps) => {
  const [hoveredOrgan, setHoveredOrgan] = useState<Organ | null>(null);

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-secondary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Mapa Corporal</h2>
          {selectedOrgan && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {selectedOrgan.nombre}
            </Badge>
          )}
        </div>
        
        <div className="relative w-full aspect-[1/2] max-w-md mx-auto">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 4px 6px var(--shadow-medium))" }}
          >
            {/* Silueta corporal simplificada */}
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Cabeza */}
            <ellipse cx="50" cy="12" rx="8" ry="10" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="0.5" />
            
            {/* Cuello */}
            <rect x="47" y="20" width="6" height="5" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="0.5" />
            
            {/* Torso */}
            <ellipse cx="50" cy="45" rx="18" ry="20" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="0.5" />
            
            {/* Brazos */}
            <ellipse cx="30" cy="42" rx="5" ry="15" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <ellipse cx="70" cy="42" rx="5" ry="15" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="0.5" />
            
            {/* Piernas */}
            <ellipse cx="43" cy="80" rx="6" ry="18" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <ellipse cx="57" cy="80" rx="6" ry="18" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="0.5" />
            
            {/* Puntos de órganos interactivos */}
            {organs.map((organ) => {
              const isSelected = selectedOrgan?.id === organ.id;
              const isHovered = hoveredOrgan?.id === organ.id;
              const scale = isSelected ? 1.5 : isHovered ? 1.3 : 1;
              
              return (
                <g key={organ.id}>
                  <circle
                    cx={organ.coordenada_x}
                    cy={organ.coordenada_y}
                    r={organ.radio_deteccion / 2}
                    fill={isSelected ? "hsl(var(--primary))" : isHovered ? "hsl(var(--healing))" : "hsl(var(--primary))"}
                    opacity={isSelected ? 0.9 : isHovered ? 0.7 : 0.6}
                    stroke="hsl(var(--background))"
                    strokeWidth="0.5"
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: `${organ.coordenada_x}% ${organ.coordenada_y}%`,
                    }}
                    onMouseEnter={() => setHoveredOrgan(organ)}
                    onMouseLeave={() => setHoveredOrgan(null)}
                    onClick={() => onOrganSelect(organ)}
                  />
                  {(isHovered || isSelected) && (
                    <text
                      x={organ.coordenada_x}
                      y={organ.coordenada_y - 3}
                      textAnchor="middle"
                      className="text-[3px] font-medium fill-foreground pointer-events-none"
                    >
                      {organ.nombre}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        {hoveredOrgan && !selectedOrgan && (
          <div className="text-center text-sm text-muted-foreground animate-in fade-in">
            Haz clic en <span className="font-semibold text-foreground">{hoveredOrgan.nombre}</span> para ver interpretación
          </div>
        )}
      </div>
    </Card>
  );
};
