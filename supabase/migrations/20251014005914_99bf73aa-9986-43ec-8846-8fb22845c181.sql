-- Crear tabla de perfiles de usuario
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Los usuarios pueden ver su propio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden insertar su propio perfil"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Crear tabla de órganos
CREATE TABLE public.organos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  zona_principal TEXT NOT NULL,
  sistema_corporal TEXT,
  coordenada_x DECIMAL(5,2),
  coordenada_y DECIMAL(5,2),
  radio_deteccion DECIMAL(5,2) DEFAULT 10.0,
  descripcion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índice para búsquedas por zona
CREATE INDEX idx_organos_zona ON public.organos(zona_principal);

-- Habilitar RLS (lectura pública, escritura solo admin)
ALTER TABLE public.organos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Los órganos son visibles para todos"
  ON public.organos FOR SELECT
  USING (true);

-- Crear tabla de interpretaciones biodecodificación
CREATE TABLE public.interpretaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organo_id UUID REFERENCES public.organos(id) ON DELETE CASCADE,
  sintoma TEXT NOT NULL,
  causa_probable TEXT NOT NULL,
  patron_emocional TEXT,
  afirmacion_positiva TEXT NOT NULL,
  fuente_manual TEXT DEFAULT 'Louise Hay - Sana tu Cuerpo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índice para búsquedas por órgano
CREATE INDEX idx_interpretaciones_organo ON public.interpretaciones(organo_id);

-- Habilitar RLS (lectura pública)
ALTER TABLE public.interpretaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Las interpretaciones son visibles para todos"
  ON public.interpretaciones FOR SELECT
  USING (true);

-- Crear tabla de lecturas del sensor
CREATE TABLE public.lecturas_sensor (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  zona_ble TEXT NOT NULL,
  organo_detectado_id UUID REFERENCES public.organos(id),
  tipo_toque TEXT,
  presion INTEGER,
  duracion INTEGER,
  notas_usuario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para búsquedas
CREATE INDEX idx_lecturas_user ON public.lecturas_sensor(user_id);
CREATE INDEX idx_lecturas_timestamp ON public.lecturas_sensor(timestamp DESC);

-- Habilitar RLS
ALTER TABLE public.lecturas_sensor ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Los usuarios pueden ver sus propias lecturas"
  ON public.lecturas_sensor FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden insertar sus propias lecturas"
  ON public.lecturas_sensor FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propias lecturas"
  ON public.lecturas_sensor FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propias lecturas"
  ON public.lecturas_sensor FOR DELETE
  USING (auth.uid() = user_id);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para profiles
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nombre, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nombre', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();