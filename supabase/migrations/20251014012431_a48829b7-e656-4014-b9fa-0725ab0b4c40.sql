-- Continuar actualizando interpretaciones con información bio-emocional

-- ESTÓMAGO
UPDATE public.interpretaciones SET
  sentido_biologico = 'El estómago digiere y procesa el "alimento" tanto físico como emocional. Representa nuestra capacidad de asimilar las experiencias de la vida.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de "no puedo digerir esto". "Me lo trago pero no lo acepto". Contrariedad que me cuesta digerir. Rabia acumulada en el estómago por situaciones injustas.',
  patron_emocional = 'Temor, pavor, ansiedad. Refunfuñar y gruñir'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Estómago');

-- HÍGADO
UPDATE public.interpretaciones SET
  sentido_biologico = 'El hígado es el órgano de la desintoxicación y la transformación. Transforma lo tóxico en útil. Representa la capacidad de gestionar la ira y las emociones primitivas.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de carencia/hambruna. "No tengo lo necesario para vivir". Ira crónica, rencor acumulado. Miedo a la falta (de comida, dinero, amor). Dificultad para digerir la vida.',
  patron_emocional = 'Ira crónica, justificación constante, sentirse mal'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Hígado');

-- PÁNCREAS  
UPDATE public.interpretaciones SET
  sentido_biologico = 'El páncreas regula el azúcar (dulzura) en sangre. Representa nuestra capacidad de disfrutar y encontrar dulzura en la vida.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de "lucha" o "resistencia". "La vida no es dulce". Conflicto con la familia (el clan). Situación de injusticia o desagrado familiar. Falta de reconocimiento.',
  patron_emocional = 'Falta de dulzura en la vida, mucha amargura'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Páncreas');

-- INTESTINOS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los intestinos representan la capacidad de asimilar lo bueno y soltar lo que ya no sirve. Dejar ir el pasado.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de "guarrería" o "cochinada". No poder soltar algo repugnante. Miedo a la falta. Dificultad para desprenderse de situaciones, personas o creencias que ya no nutren.',
  patron_emocional = 'Miedo a soltar lo viejo e innecesario'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Intestinos');

-- RIÑONES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los riñones filtran y purifican. Representan la capacidad de discernir lo que es bueno de lo que no lo es. Equilibrio de líquidos y emociones.',
  etapa_embrionaria = '1ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de líquidos y existencial. "Esto se derrumba". Miedo a la muerte (propia o de seres queridos). Conflicto con los líquidos (agua, dinero, emociones). Sentirse solo, abandonado.',
  patron_emocional = 'Crítica, decepción, fracaso. Vergüenza. Reacciones emocionales infantiles'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Riñones');

-- VESÍCULA
UPDATE public.interpretaciones SET
  sentido_biologico = 'La vesícula almacena y libera bilis para digerir las grasas. Representa la capacidad de soltar la ira y el rencor acumulados.',
  etapa_embrionaria = '4ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de rencor contra el padre o la autoridad. "No puedo digerir a esta persona". Ira contenida hacia alguien en posición de poder. Injusticia sentida profundamente.',
  patron_emocional = 'Ira, amargura, pensamientos duros. Orgullo, resentimiento acumulado'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Vesícula');

-- CERVICALES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las vértebras cervicales sostienen la cabeza y permiten la movilidad del cuello. Representan la flexibilidad mental y la capacidad de ver diferentes perspectivas.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización intelectual. "No puedo decir que no". Rigidez mental. Negarse a ver otros puntos de vista. "Debo mantener la cabeza alta ante la adversidad".',
  patron_emocional = 'Terquedad inflexible, negación a ver otros puntos de vista'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Cervicales');

-- DORSALES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las vértebras dorsales sostienen el tronco y protegen órganos vitales. Representan el soporte emocional y la capacidad de mantenerse firme.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización afectiva. "No me siento respaldado". Falta de apoyo emocional en la vida. Carga excesiva de responsabilidades. "Debo ser fuerte".',
  patron_emocional = 'Falta de apoyo emocional, sentirse sin respaldo'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Dorsales');

-- LUMBARES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las vértebras lumbares sostienen el peso del cuerpo. Representan el apoyo material y la seguridad económica.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización en el movimiento y dirección. Miedo al dinero o a la falta de recursos. "No tengo apoyo material". Inseguridad respecto al futuro económico.',
  patron_emocional = 'Miedo al dinero, falta de apoyo financiero'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Lumbares');

-- HOMBROS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los hombros cargan y sostienen. Representan nuestra capacidad de llevar responsabilidades y experiencias de vida.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización como padre/madre o cuidador. Sobrecarga de responsabilidades. "Cargo con demasiado". "Debo hacerme cargo de todo". Impotencia para actuar.',
  patron_emocional = 'Sobrecarga de responsabilidades, la vida es una carga'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Hombros');

-- BRAZOS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los brazos ejecutan, abrazan y rechazan. Representan nuestra capacidad de hacer y de conectar con los demás.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización en la acción. "No puedo hacerlo". "No puedo abrazar mi vida". Dificultad para trabajar o realizar tareas. Sentirse inútil en la acción.',
  patron_emocional = 'Dificultad para abrazar las experiencias de la vida, rigidez'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Brazos');

-- MANOS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las manos agarran, sueltan, dan y reciben. Representan la capacidad de manejar situaciones y relacionarnos con el mundo.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización en la destreza. "No puedo agarrar/soltar esto". Aferrarse demasiado o soltar demasiado rápido. Rigidez en el manejo de situaciones.',
  patron_emocional = 'Aferrarse demasiado, no poder manejar situaciones'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Manos');

-- CADERAS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las caderas dan equilibrio y soporte al avanzar. Representan la capacidad de tomar decisiones importantes y avanzar en la vida.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización sexual o de orientación. Miedo a tomar decisiones importantes. "No puedo avanzar". Rigidez ante cambios importantes en la vida.',
  patron_emocional = 'Miedo a seguir adelante en decisiones importantes'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Caderas');

-- RODILLAS
UPDATE public.interpretaciones SET
  sentido_biologico = 'Las rodillas permiten la flexibilidad al caminar. Representan la humildad, la capacidad de ceder y adaptarse.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización deportiva o de sumisión. Orgullo excesivo. "Debo someterme". Miedo a arrodillarse o a ceder. Inflexibilidad ante la vida.',
  patron_emocional = 'Terquedad e inflexibilidad, orgullo y ego. Miedo, no ceder'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Rodillas');

-- PIES
UPDATE public.interpretaciones SET
  sentido_biologico = 'Los pies son la base y el contacto con la tierra (realidad). Representan nuestra posición en la vida y hacia dónde nos dirigimos.',
  etapa_embrionaria = '3ª Etapa Embrionaria',
  conflicto_adicional = 'Conflicto de desvalorización en la posición social o materna. Miedo al futuro. "No puedo avanzar". Inseguridad sobre el camino a seguir. Pérdida de la madre o de las raíces.',
  patron_emocional = 'Miedo al futuro y a no avanzar en la vida'
WHERE organo_id = (SELECT id FROM public.organos WHERE nombre = 'Pies');