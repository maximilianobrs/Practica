
-- Utilizando la base de datos "InPractica-2".

-- Inserte 3 cursos nuevos.
INSERT INTO capacitacion (nombre, horario, costo_realizacion, fecha_realizacion)
VALUES
  ('Taller de Marketing Digital para Emprendedores', 'Jueves 18:00-20:00', 120000.00, '2023-02-02'),
  ('Curso de Desarrollo Web Frontend', 'Martes y Jueves 14:00-16:00', 180000.00, '2023-02-05'),
  ('Seminario de Gestión de Recursos Humanos', 'Viernes 09:30-12:30', 150000.00, '2023-02-08');

-- Inserte 3 profesores nuevos
INSERT INTO operadores (rut, nombre, apellido, direccion, correo_electronico, fecha_creacion)
VALUES
  ('1234123421-0', 'Gabriela', 'López', 'Calle Central 456', 'gabrielalopez@example.com', '2023-06-01'),
  ('2345234532-1', 'Roberto', 'García', 'Avenida Principal 789', 'robertogarcia@example.com', '2023-06-02'),
  ('3456345641-2', 'Paulina', 'Herrera', 'Calle Secundaria 123', 'paulinaherrera@example.com', '2023-06-03');

-- Seleccionando el curso mas costoso.

SELECT *
FROM capacitacion
WHERE costo_realizacion = (SELECT MAX(costo_realizacion) FROM capacitacion)
LIMIT 1;

-- Seleccionando los cursos mas costosos que el promedio.

SELECT *
FROM capacitacion
WHERE costo_realizacion > (SELECT AVG(costo_realizacion) FROM capacitacion);

-- Creando una tabla con los cursos mas economicos.

CREATE TABLE cursos_economicos AS
SELECT *
FROM capacitacion
WHERE costo_realizacion < (SELECT AVG(costo_realizacion) FROM capacitacion);

--Agregando dos columnas a la tabla "Cursos económicos" para representar la cantidad mínima de estudiantes y los aportes públicos para cada curso.

ALTER TABLE cursos_economicos
ADD COLUMN cantidad_min_estudiantes INTEGER,
ADD COLUMN aportes_publicos INTEGER;

--Cambiando el nombre de la columna "costo_realizacion" en la tabla "Cursos económicos" a "costo_realizacion efectivo" y para representar los aportes públicos a cada valor.

ALTER TABLE cursos_economicos
RENAME costo_realizacion TO costo_realizacion_efectivo;

UPDATE cursos_economicos
SET costo_realizacion_efectivo = costo_realizacion_efectivo - aportes_publicos;


--ACTUALIZACION CURSOS 
UPDATE capacitacion
SET horario = 'Sabado 18:00-20:00'
WHERE nombre = 'Taller de Marketing Digital para Emprendedores';

UPDATE capacitacion
SET horario = 'Lunes y Martes 14:00-16:00'
WHERE nombre = 'Curso de Desarrollo Web Frontend';

UPDATE capacitacion
SET horario = 'Miercoles 09:30-12:30'
WHERE nombre = 'Seminario de Gestión de Recursos Humanos';

UPDATE capacitacion
SET horario = 'Jueves y VIernes 18:00-20:00'
WHERE nombre = 'Curso de Programación';

UPDATE capacitacion
SET horario = 'Viernes y Sabado 15:00-17:00'
WHERE nombre = 'Taller de Diseño Gráfico';

--ACTUALIZACION DE PROFESORES

UPDATE operadores
SET direccion = 'Calle Principal 200'
WHERE rut = '1234123421-0';

UPDATE operadores
SET correo_electronico = 'robertogarcia_1990@example.com'
WHERE rut = '2345234532-1';

UPDATE operadores
SET apellido = 'Guzman', correo_electronico = 'paulinaGuzman@example.com'
WHERE rut = '3456345641-2';
