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
            {/* Silueta corporal 3D mejorada */}
            <defs>
              {/* Gradiente 3D para la silueta */}
              <linearGradient id="body3DGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
              
              {/* Gradiente de profundidad */}
              <radialGradient id="depthGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </radialGradient>
              
              {/* Sombra suave para efecto 3D */}
              <filter id="soft3DShadow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feOffset dx="0.2" dy="0.3" result="offsetBlur"/>
                <feMerge>
                  <feMergeNode in="offsetBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Cabeza - más redondeada y realista */}
            <ellipse cx="50" cy="8" rx="8" ry="10" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.3" 
                     opacity="0.85"
                     filter="url(#soft3DShadow)" />
            
            {/* Cuello con volumen */}
            <path d="M 45 17 L 45 23 Q 47 24 50 24 Q 53 24 55 23 L 55 17 Z" 
                  fill="url(#body3DGradient)" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="0.3" 
                  opacity="0.8"
                  filter="url(#soft3DShadow)" />
            
            {/* Hombros redondeados */}
            <ellipse cx="34" cy="28" rx="7" ry="5" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.3" 
                     opacity="0.85"
                     filter="url(#soft3DShadow)" />
            <ellipse cx="66" cy="28" rx="7" ry="5" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.3" 
                     opacity="0.85"
                     filter="url(#soft3DShadow)" />
            
            {/* Torso superior con forma anatómica */}
            <path d="M 40 28 Q 34 32 32 40 Q 31 50 34 58 L 38 60 L 62 60 L 66 58 Q 69 50 68 40 Q 66 32 60 28 Z" 
                  fill="url(#body3DGradient)" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="0.3" 
                  opacity="0.85"
                  filter="url(#soft3DShadow)" />
            
            {/* Brazos superiores con volumen */}
            <ellipse cx="27" cy="42" rx="4.5" ry="14" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.25" 
                     opacity="0.75"
                     filter="url(#soft3DShadow)" />
            <ellipse cx="73" cy="42" rx="4.5" ry="14" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.25" 
                     opacity="0.75"
                     filter="url(#soft3DShadow)" />
            
            {/* Antebrazos */}
            <ellipse cx="24" cy="58" rx="3.5" ry="12" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.25" 
                     opacity="0.7"
                     filter="url(#soft3DShadow)" />
            <ellipse cx="76" cy="58" rx="3.5" ry="12" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.25" 
                     opacity="0.7"
                     filter="url(#soft3DShadow)" />
            
            {/* Manos con más definición */}
            <path d="M 22 69 Q 21 71 22 73 Q 23 72 24 71 Q 25 72 26 73 Q 27 71 26 69 Z" 
                  fill="url(#depthGradient)" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="0.2" 
                  opacity="0.7"
                  filter="url(#soft3DShadow)" />
            <path d="M 74 69 Q 73 71 74 73 Q 75 72 76 71 Q 77 72 78 73 Q 79 71 78 69 Z" 
                  fill="url(#depthGradient)" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="0.2" 
                  opacity="0.7"
                  filter="url(#soft3DShadow)" />
            
            {/* Abdomen/Cintura con curvas naturales */}
            <path d="M 38 60 Q 36 63 36 66 Q 36 69 38 71 L 62 71 Q 64 69 64 66 Q 64 63 62 60 Z" 
                  fill="url(#body3DGradient)" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="0.3" 
                  opacity="0.85"
                  filter="url(#soft3DShadow)" />
            
            {/* Caderas más definidas */}
            <ellipse cx="50" cy="74" rx="15" ry="6" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.3" 
                     opacity="0.85"
                     filter="url(#soft3DShadow)" />
            
            {/* Muslos con volumen */}
            <ellipse cx="42" cy="83" rx="5.5" ry="13" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.3" 
                     opacity="0.8"
                     filter="url(#soft3DShadow)" />
            <ellipse cx="58" cy="83" rx="5.5" ry="13" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.3" 
                     opacity="0.8"
                     filter="url(#soft3DShadow)" />
            
            {/* Piernas inferiores (pantorrillas) */}
            <ellipse cx="41" cy="92" rx="4" ry="6" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.25" 
                     opacity="0.75"
                     filter="url(#soft3DShadow)" />
            <ellipse cx="59" cy="92" rx="4" ry="6" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.25" 
                     opacity="0.75"
                     filter="url(#soft3DShadow)" />
            
            {/* Pies con forma más realista */}
            <ellipse cx="40" cy="98" rx="3.5" ry="1.8" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.2" 
                     opacity="0.7"
                     filter="url(#soft3DShadow)" />
            <ellipse cx="60" cy="98" rx="3.5" ry="1.8" 
                     fill="url(#depthGradient)" 
                     stroke="hsl(var(--primary))" 
                     strokeWidth="0.2" 
                     opacity="0.7"
                     filter="url(#soft3DShadow)" />
            
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
