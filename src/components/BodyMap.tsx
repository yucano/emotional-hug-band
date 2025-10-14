import { useState } from "react";
import { cn } from "@/lib/utils";

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
  onOrganClick: (organ: Organ) => void;
  selectedOrganId?: string;
}

export const BodyMap = ({ organs, onOrganClick, selectedOrganId }: BodyMapProps) => {
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  return (
    <div className="w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        style={{ maxHeight: "600px" }}
      >
        {/* Cuerpo humano simplificado */}
        <g className="body-outline">
          {/* Cabeza */}
          <ellipse
            cx="50"
            cy="15"
            rx="12"
            ry="15"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
          
          {/* Cuello */}
          <rect
            x="47"
            y="28"
            width="6"
            height="6"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
          
          {/* Torso */}
          <ellipse
            cx="50"
            cy="50"
            rx="18"
            ry="22"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
          
          {/* Brazos */}
          <ellipse
            cx="30"
            cy="45"
            rx="4"
            ry="18"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
          <ellipse
            cx="70"
            cy="45"
            rx="4"
            ry="18"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
          
          {/* Piernas */}
          <ellipse
            cx="42"
            cy="82"
            rx="5"
            ry="20"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
          <ellipse
            cx="58"
            cy="82"
            rx="5"
            ry="20"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
        </g>

        {/* Puntos de órganos clicables */}
        {organs.map((organ) => {
          const isSelected = selectedOrganId === organ.id;
          const isHovered = hoveredOrgan === organ.id;
          
          return (
            <g key={organ.id}>
              <circle
                cx={organ.coordenada_x}
                cy={organ.coordenada_y}
                r={isSelected || isHovered ? organ.radio_deteccion * 1.2 : organ.radio_deteccion}
                fill={
                  isSelected
                    ? "hsl(var(--primary))"
                    : isHovered
                    ? "hsl(var(--accent))"
                    : "hsl(var(--secondary))"
                }
                opacity={isSelected || isHovered ? 0.8 : 0.6}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onOrganClick(organ)}
                onMouseEnter={() => setHoveredOrgan(organ.id)}
                onMouseLeave={() => setHoveredOrgan(null)}
              />
              {(isSelected || isHovered) && (
                <text
                  x={organ.coordenada_x}
                  y={organ.coordenada_y - organ.radio_deteccion - 2}
                  textAnchor="middle"
                  className="text-[3px] fill-foreground font-medium"
                >
                  {organ.nombre}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
