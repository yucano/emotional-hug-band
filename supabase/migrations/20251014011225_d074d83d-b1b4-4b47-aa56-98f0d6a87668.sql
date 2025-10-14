-- Actualizar coordenadas de órganos para que coincidan con la anatomía

-- CABEZA
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 10, radio_deteccion = 6 WHERE nombre = 'Cerebro';
UPDATE public.organos SET coordenada_x = 46, coordenada_y = 11, radio_deteccion = 3 WHERE nombre = 'Ojos';
UPDATE public.organos SET coordenada_x = 41, coordenada_y = 12, radio_deteccion = 3 WHERE nombre = 'Oídos';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 14, radio_deteccion = 2.5 WHERE nombre = 'Nariz';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 17, radio_deteccion = 3 WHERE nombre = 'Boca';

-- CUELLO/GARGANTA
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 23, radio_deteccion = 4 WHERE nombre = 'Garganta';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 24, radio_deteccion = 3.5 WHERE nombre = 'Tiroides';

-- PECHO/TORSO SUPERIOR
UPDATE public.organos SET coordenada_x = 47, coordenada_y = 40, radio_deteccion = 5 WHERE nombre = 'Corazón';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 38, radio_deteccion = 7 WHERE nombre = 'Pulmones';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 34, radio_deteccion = 5 WHERE nombre = 'Senos';

-- ABDOMEN/PLEXO
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 48, radio_deteccion = 5 WHERE nombre = 'Estómago';
UPDATE public.organos SET coordenada_x = 56, coordenada_y = 47, radio_deteccion = 4.5 WHERE nombre = 'Hígado';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 49, radio_deteccion = 3.5 WHERE nombre = 'Páncreas';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 56, radio_deteccion = 6 WHERE nombre = 'Intestinos';
UPDATE public.organos SET coordenada_x = 44, coordenada_y = 50, radio_deteccion = 3.5 WHERE nombre = 'Riñones';
UPDATE public.organos SET coordenada_x = 55, coordenada_y = 48, radio_deteccion = 3 WHERE nombre = 'Vesícula';

-- COLUMNA VERTEBRAL
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 27, radio_deteccion = 3.5 WHERE nombre = 'Cervicales';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 42, radio_deteccion = 4 WHERE nombre = 'Dorsales';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 58, radio_deteccion = 4 WHERE nombre = 'Lumbares';

-- EXTREMIDADES SUPERIORES
UPDATE public.organos SET coordenada_x = 35, coordenada_y = 32, radio_deteccion = 4 WHERE nombre = 'Hombros';
UPDATE public.organos SET coordenada_x = 30, coordenada_y = 45, radio_deteccion = 3.5 WHERE nombre = 'Brazos';
UPDATE public.organos SET coordenada_x = 25, coordenada_y = 57, radio_deteccion = 3.5 WHERE nombre = 'Manos';

-- EXTREMIDADES INFERIORES
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 62, radio_deteccion = 5 WHERE nombre = 'Caderas';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 75, radio_deteccion = 4 WHERE nombre = 'Rodillas';
UPDATE public.organos SET coordenada_x = 50, coordenada_y = 95, radio_deteccion = 4 WHERE nombre = 'Pies';