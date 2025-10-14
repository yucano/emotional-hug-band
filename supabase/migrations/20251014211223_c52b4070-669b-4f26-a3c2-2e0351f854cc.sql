-- Tabla para favoritos de interpretaciones
CREATE TABLE IF NOT EXISTS public.favoritos_interpretaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organo_id UUID NOT NULL REFERENCES public.organos(id) ON DELETE CASCADE,
  interpretacion_id UUID NOT NULL REFERENCES public.interpretaciones(id) ON DELETE CASCADE,
  notas_usuario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, interpretacion_id)
);

-- Enable RLS
ALTER TABLE public.favoritos_interpretaciones ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Los usuarios pueden ver sus propios favoritos"
ON public.favoritos_interpretaciones
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden insertar sus propios favoritos"
ON public.favoritos_interpretaciones
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propios favoritos"
ON public.favoritos_interpretaciones
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propios favoritos"
ON public.favoritos_interpretaciones
FOR DELETE
USING (auth.uid() = user_id);

-- Tabla para configuración de alertas personalizadas
CREATE TABLE IF NOT EXISTS public.alertas_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  umbral_heart_rate_max INTEGER DEFAULT 120,
  umbral_heart_rate_min INTEGER DEFAULT 50,
  umbral_stress_level INTEGER DEFAULT 80,
  umbral_hrv_min INTEGER DEFAULT 20,
  alertas_habilitadas BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.alertas_config ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Los usuarios pueden ver su propia configuración"
ON public.alertas_config
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden insertar su propia configuración"
ON public.alertas_config
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar su propia configuración"
ON public.alertas_config
FOR UPDATE
USING (auth.uid() = user_id);

-- Trigger para updated_at
CREATE TRIGGER update_alertas_config_updated_at
BEFORE UPDATE ON public.alertas_config
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();