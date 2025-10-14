-- Continuar actualizando interpretaciones bio-emocionales

-- ESTÓMAGO
UPDATE public.interpretaciones SET
  sentido_biologico = 'El estómago procesa y digiere el pedazo. Representa nuestra capacidad de digerir las situaciones de la vida.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de "esforzarse para digerir el pedazo". "Me lo trago pero no lo acepto". Rabia guardada en el estómago. Indigestión emocional de situaciones.',
  patron_emocional = 'Temor, pavor, ansiedad, refunfuñar y gruñir'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Estómago');

-- HÍGADO
UPDATE public.interpretaciones SET
  sentido_biologico = 'El hígado es la sede de la ira y las acciones primitivas. Centro de desintoxicación física y emocional.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de "carencia" o "falta del pedazo esencial". Miedo a carecer de lo necesario. Ira contra el padre o la autoridad. Rencor acumulado que no podemos digerir.',
  patron_emocional = 'Ira crónica, justificación constante, sentirse mal'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Hígado');

-- PÁNCREAS
UPDATE public.interpretaciones SET
  sentido_biologico = 'El páncreas regula el azúcar en sangre. Representa la dulzura y el placer de vivir.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de "pedazo indigesto" con resistencia. Contrariedad familiar. Luchas o herencias familiares. Falta de dulzura o ternura en la vida.',
  patron_emocional = 'Falta de dulzura en la vida, mucha amargura'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Páncreas');

-- INTESTINOS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los intestinos procesan y eliminan lo que ya no necesitamos. Capacidad de asimilar y soltar.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de "guarrada indigesta" que no puedo eliminar. "No puedo soltar lo viejo". Dificultades para dejar ir situaciones o personas del pasado.',
  patron_emocional = 'Miedo a soltar lo viejo e innecesario'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Intestinos');

-- RIÑONES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los riñones filtran y purifican. Representan la capacidad de discernir entre lo útil y lo tóxico en la vida.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de líquidos o referencias. Sentirse derrumbado. "No sé qué es lo correcto". Desmoronamiento de las referencias vitales. Pérdida de rumbo.',
  patron_emocional = 'Crítica, decepción, fracaso, vergüenza'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Riñones');

-- VESÍCULA
UPDATE public.interpretaciones SET
  sentido_biologico = 'La vesícula almacena la bilis (ira). Representa la capacidad de gestionar la rabia y el rencor.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de rencor e ira contra el padre o la autoridad. "No puedo digerir a esta persona". Resentimiento acumulado. Rivalidad no resuelta.',
  patron_emocional = 'Ira, amargura, pensamientos duros, orgullo, resentimiento'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Vesícula');

-- CERVICALES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las cervicales sostienen la cabeza y permiten el movimiento. Representan la flexibilidad mental y la capacidad de ver diferentes perspectivas.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización intelectual y de flexibilidad. "Debo mantener la cabeza alta". Rigidez mental. No poder o no querer ver lo que queda atrás.',
  patron_emocional = 'Terquedad inflexible, negación a ver otros puntos de vista'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Cervicales');

-- DORSALES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las dorsales sostienen el torso medio. Representan el soporte emocional y afectivo en la vida.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización afectiva. "No me siento respaldado". Falta de apoyo emocional. Cargar con responsabilidades afectivas pesadas.',
  patron_emocional = 'Falta de apoyo emocional, sentirse sin respaldo'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Dorsales');

-- LUMBARES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las lumbares sostienen la parte baja de la espalda. Representan el soporte material y la seguridad económica.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización en relación al dinero, trabajo o sexualidad. "No tengo soporte económico". Miedo a la carencia material.',
  patron_emocional = 'Miedo al dinero, falta de apoyo financiero'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Lumbares');

-- HOMBROS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los hombros cargan y sostienen. Representan nuestra capacidad de llevar responsabilidades.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de "debo cargar con todo". Sobrecarga de responsabilidades. "La vida es muy pesada". Conflicto entre querer ayudar y sentirse agobiado.',
  patron_emocional = 'Sobrecarga de responsabilidades, la vida es una carga'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Hombros');

-- BRAZOS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los brazos abarcan, abrazan y ejecutan. Representan nuestra capacidad de abrazar las experiencias de la vida.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de no poder abrazar o de ser rechazado. "No puedo abrazar mi vida". Rigidez ante las experiencias. Rechazo de lo nuevo.',
  patron_emocional = 'Dificultad para abrazar experiencias, rigidez'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Brazos');

-- MANOS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las manos agarran, sueltan y crean. Representan nuestra habilidad para manejar la vida y las situaciones.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de "no poder agarrar" o "no poder soltar". Aferrarse demasiado. Control excesivo. "No puedo manejar esta situación".',
  patron_emocional = 'Aferrarse demasiado, no poder manejar situaciones'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Manos');

-- CADERAS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las caderas sostienen y equilibran el cuerpo. Representan el equilibrio vital y la capacidad de avanzar con estabilidad.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de miedo a avanzar en decisiones importantes. "No puedo seguir adelante". Desequilibrio entre dar y recibir. Rigidez ante los cambios.',
  patron_emocional = 'Miedo a seguir adelante en decisiones importantes'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Caderas');

-- RODILLAS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las rodillas permiten flexibilidad y sumisión cuando es necesario. Representan el orgullo y la humildad.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de orgullo y ego. "No me arrodillo ante nadie". Terquedad extrema. Dificultad para ceder o pedir perdón. Inflexibilidad ante la autoridad.',
  patron_emocional = 'Terquedad e inflexibilidad, miedo, no ceder, orgullo'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Rodillas');

-- PIES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los pies nos conectan con la tierra y nos permiten avanzar. Representan nuestro contacto con la realidad y la dirección de vida.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de dirección y posición. "No sé hacia dónde ir". Miedo al futuro. Falta de conexión con la madre/tierra. Sensación de no tener base sólida.',
  patron_emocional = 'Miedo al futuro y a no avanzar en la vida'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Pies');