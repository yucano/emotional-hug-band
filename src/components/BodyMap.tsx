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
            {/* Silueta corporal mejorada */}
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                <stop offset="50%" stopColor="hsl(var(--healing))" stopOpacity="0.1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
              </linearGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="0.3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Cabeza más realista */}
            <ellipse cx="50" cy="10" rx="7" ry="9" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.8" filter="url(#softGlow)" />
            
            {/* Cuello con forma más natural */}
            <path d="M 46 18 Q 48 22 50 23 Q 52 22 54 18" 
                  fill="url(#bodyGradient)" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="0.4" 
                  opacity="0.8" />
            
            {/* Hombros */}
            <ellipse cx="35" cy="30" rx="6" ry="4" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.8" />
            <ellipse cx="65" cy="30" rx="6" ry="4" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.8" />
            
            {/* Torso superior (pecho) */}
            <path d="M 38 30 Q 32 35 32 45 Q 32 55 38 60 L 62 60 Q 68 55 68 45 Q 68 35 62 30 Z" 
                  fill="url(#bodyGradient)" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="0.4" 
                  opacity="0.8" 
                  filter="url(#softGlow)" />
            
            {/* Brazos superiores */}
            <ellipse cx="28" cy="40" rx="4" ry="12" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.7" />
            <ellipse cx="72" cy="40" rx="4" ry="12" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.7" />
            
            {/* Antebrazos */}
            <ellipse cx="25" cy="54" rx="3" ry="10" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.6" />
            <ellipse cx="75" cy="54" rx="3" ry="10" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.6" />
            
            {/* Manos */}
            <ellipse cx="24" cy="65" rx="2.5" ry="3" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.6" />
            <ellipse cx="76" cy="65" rx="2.5" ry="3" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.6" />
            
            {/* Abdomen/Cintura */}
            <path d="M 38 60 Q 35 65 36 70 L 64 70 Q 65 65 62 60 Z" 
                  fill="url(#bodyGradient)" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="0.4" 
                  opacity="0.8" />
            
            {/* Caderas */}
            <ellipse cx="50" cy="72" rx="16" ry="6" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.8" />
            
            {/* Muslos */}
            <ellipse cx="43" cy="82" rx="5" ry="12" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.8" />
            <ellipse cx="57" cy="82" rx="5" ry="12" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.8" />
            
            {/* Piernas inferiores */}
            <ellipse cx="42" cy="89" rx="4" ry="7" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.7" />
            <ellipse cx="58" cy="89" rx="4" ry="7" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.7" />
            
            {/* Pies */}
            <ellipse cx="41" cy="97" rx="3" ry="2" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.6" />
            <ellipse cx="59" cy="97" rx="3" ry="2" fill="url(#bodyGradient)" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.6" />
            
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
