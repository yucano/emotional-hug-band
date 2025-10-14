-- Agregar nuevos campos a la tabla de interpretaciones
ALTER TABLE public.interpretaciones 
ADD COLUMN IF NOT EXISTS sentido_biologico TEXT,
ADD COLUMN IF NOT EXISTS etapa_embrionaria TEXT,
ADD COLUMN IF NOT EXISTS conflicto_adicional TEXT;

-- Actualizar interpretaciones existentes con información bio-emocional más completa

-- CEREBRO
UPDATE public.interpretaciones SET
  sentido_biologico = 'El cerebro es el centro de control de todo el cuerpo. Representa nuestra capacidad de análisis, decisión y coordinación de todas las funciones vitales.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Desvalorización intelectual. Incapacidad de comprender o procesar información. "No soy capaz de pensar correctamente". Necesidad de reprogramar patrones mentales.',
  patron_emocional = 'Necesidad de reprogramar patrones de pensamiento rígidos o limitantes'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Cerebro');

-- OJOS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los ojos representan nuestra capacidad de ver y percibir la realidad. Ver claramente el pasado, presente y futuro.',
  etapa_embrionaria = '4ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de separación visual. "No quiero ver esto". "Lo que veo me asusta o me disgusta". Miedo a ver la realidad tal como es.',
  patron_emocional = 'Rechazo de lo que veo en mi vida, miedo al futuro'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Ojos');

-- OÍDOS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los oídos representan la capacidad de escuchar y recibir información. También están relacionados con el equilibrio vital.',
  etapa_embrionaria = '1ª y 4ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de separación auditiva. "No quiero escuchar". "El silencio es insoportable". Tozudez, no querer escuchar las propias necesidades interiores.',
  patron_emocional = 'Rechazo, obstinación, aislamiento del mundo sonoro'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Oídos');

-- NARIZ
UPDATE public.interpretaciones SET
  sentido_biologico = 'La nariz representa el auto-reconocimiento y la intuición. Capacidad de "oler" el peligro o las oportunidades.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de "pedazo" de aire. "No me reconozco". "Algo huele mal en mi vida". Necesidad de separarse de olores o ambientes tóxicos.',
  patron_emocional = 'Dificultad para reconocerse a sí mismo, intuición bloqueada'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Nariz');

-- BOCA
UPDATE public.interpretaciones SET
  sentido_biologico = 'La boca representa la capacidad de nutrirnos y comunicarnos. Primera puerta del sistema digestivo y de la expresión verbal.',
  etapa_embrionaria = '1ª y 4ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de pedazo y de expresión. "No puedo decir lo que pienso". "Algo me mancha la boca". Secretos familiares que no se pueden expresar.',
  patron_emocional = 'Opiniones arraigadas, mente cerrada, incapacidad de expresar'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Boca');

-- GARGANTA
UPDATE public.interpretaciones SET
  sentido_biologico = 'La garganta es el canal de expresión y creatividad. Representa nuestra capacidad de comunicar nuestra verdad.',
  etapa_embrionaria = '4ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de expresión bloqueada. "Me guardo las palabras en el fondo de mi garganta". "Por más que gritaba, nadie me escuchaba". Grandes miedos no expresados.',
  patron_emocional = 'Incapacidad de expresarse, ira reprimida, creatividad sofocada'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Garganta');

-- TIROIDES
UPDATE public.interpretaciones SET
  sentido_biologico = 'La tiroides regula el metabolismo y la velocidad de vida. Representa "mi tiempo" y el ritmo al que debo vivir.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de urgencia vital. "Debo acelerar" o "debo frenar". "Nunca hago lo que quiero, ¿cuándo me tocará a mí?". Sentimiento de injusticia respecto al tiempo.',
  patron_emocional = 'Frustración, deseos reprimidos, humillación'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Tiroides');

-- CORAZÓN
UPDATE public.interpretaciones SET
  sentido_biologico = 'El corazón es el centro del amor, la alegría y la seguridad. Bombea vida a través de todo el organismo.',
  etapa_embrionaria = '1ª y 3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de territorio y de desvalorización. "Mi territorio está amenazado". Pérdida de un ser querido. Falta de alegría en la vida. Endurecimiento emocional.',
  patron_emocional = 'Falta de alegría, endurecimiento del corazón, tensión, estrés'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Corazón');

-- PULMONES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los pulmones representan la capacidad de tomar y dar vida, de intercambiar con el exterior. El aliento de la vida.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de miedo a morir o a la asfixia. "No tengo derecho a vivir". "Me falta espacio vital". Miedo a la vida o sensación de estar siendo asfixiado por las circunstancias.',
  patron_emocional = 'Miedo a aceptar o dar vida, sensación de no tener derecho a vivir'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Pulmones');

-- SENOS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los senos representan la maternidad, la nutrición y el cuidado tanto propio como hacia otros.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de preocupación por el nido/hogar. "No puedo proteger a los míos". Separación dramática de un ser querido. Drama en el hogar o con los hijos.',
  patron_emocional = 'Negativa a nutrirse a sí misma, postergarse siempre'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Senos');