-- Crear tabla para lecturas biométricas de la pulsera
CREATE TABLE IF NOT EXISTS public.lecturas_biometricas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  heart_rate INTEGER NOT NULL,
  hrv INTEGER NOT NULL,
  temperature NUMERIC(4,1) NOT NULL,
  gsr INTEGER NOT NULL,
  stress_level INTEGER NOT NULL,
  organo_sugerido_id UUID REFERENCES public.organos(id),
  organo_sugerido_nombre TEXT,
  organo_sugerido_razon TEXT,
  organo_sugerido_confianza INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para mejorar el rendimiento de consultas
CREATE INDEX idx_lecturas_biometricas_user_id ON public.lecturas_biometricas(user_id);
CREATE INDEX idx_lecturas_biometricas_timestamp ON public.lecturas_biometricas(timestamp DESC);
CREATE INDEX idx_lecturas_biometricas_user_timestamp ON public.lecturas_biometricas(user_id, timestamp DESC);

-- Habilitar RLS
ALTER TABLE public.lecturas_biometricas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS: Los usuarios solo pueden ver y gestionar sus propias lecturas
CREATE POLICY "Los usuarios pueden ver sus propias lecturas biométricas"
  ON public.lecturas_biometricas
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden insertar sus propias lecturas biométricas"
  ON public.lecturas_biometricas
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propias lecturas biométricas"
  ON public.lecturas_biometricas
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propias lecturas biométricas"
  ON public.lecturas_biometricas
  FOR DELETE
  USING (auth.uid() = user_id);

-- Comentarios para documentación
COMMENT ON TABLE public.lecturas_biometricas IS 'Almacena las lecturas biométricas en tiempo real de la pulsera Lumen';
COMMENT ON COLUMN public.lecturas_biometricas.heart_rate IS 'Frecuencia cardíaca en BPM';
COMMENT ON COLUMN public.lecturas_biometricas.hrv IS 'Variabilidad de frecuencia cardíaca en ms';
COMMENT ON COLUMN public.lecturas_biometricas.temperature IS 'Temperatura corporal en °C';
COMMENT ON COLUMN public.lecturas_biometricas.gsr IS 'Respuesta galvánica de la piel en µS';
COMMENT ON COLUMN public.lecturas_biometricas.stress_level IS 'Nivel de estrés calculado (0-100)';