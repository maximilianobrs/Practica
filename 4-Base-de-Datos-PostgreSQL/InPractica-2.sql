CREATE DATABASE asociacion;
CREATE USER administrador WITH PASSWORD '12345';
ALTER ROLE administrador WITH SUPERUSER;

CREATE TABLE operadores(
    rut VARCHAR(12) NOT NULL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    fecha_creacion DATE NOT NULL
);
CREATE TABLE usuarios(
    usuario_id SERIAL NOT NULL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    telefono VARCHAR(100) NOT NULL,
    fecha_creacion DATE NOT NULL
);
CREATE TABLE capacitacion(
    codigo_curso SERIAL NOT NULL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    horario VARCHAR(60) NOT NULL,
    costo_realizacion MONEY NOT NULL,
    fecha_realizacion DATE NOT NULL,
);

INSERT INTO operadores (rut, nombre, apellido, direccion, correo_elecctronico, fecha_creacion)
VALUES 
    ('1234567890-K', 'Juan', 'Pérez', 'Calle 123', 'juanperez@example.com', '2022-05-15'),
    ('9876543210-3', 'María', 'González', 'Avenida 456', 'mariagonzalez@example.com', '2021-09-30'),
    ('4567891230-2', 'Pedro', 'López', 'Plaza 789', 'pedrolopez@example.com', '2023-01-10'),
    ('7891234560-6', 'Ana', 'Rodríguez', 'Calle 456', 'anarodriguez@example.com', '2022-11-20'),
    ('6543219870-K', 'Carlos', 'Sánchez', 'Avenida 123', 'carlossanchez@example.com', '2023-04-05');

INSERT INTO usuarios (nombre, apellido, correo_elecctronico, telefono, fecha_creacion)
VALUES 
    ('Juan', 'Pérez', 'juanperez@example.com', '123456789', '2021-07-02'),
    ('María', 'González', 'mariagonzalez@example.com', '987654321', '2022-02-15'),
    ('Pedro', 'López', 'pedrolopez@example.com', '456789123', '2023-03-20'),
    ('Ana', 'Rodríguez', 'anarodriguez@example.com', '789123456', '2022-12-10'),
    ('Carlos', 'Sánchez', 'carlossanchez@example.com', '654321987', '2023-05-01');

INSERT INTO capacitacion (nombre, horario, costo_realizacion, fecha_realizacion)
VALUES 
    ('Curso de programación', 'Lunes y miércoles de 18:00 a 20:00', 10000000, '2022-09-05'),
    ('Taller de diseño gráfico', 'Martes y jueves de 15:00 a 17:00', 800000.00, '2022-11-10'),
    ('Seminario de marketing digital', 'Viernes de 9:00 a 12:00', 500000.00, '2023-02-18'),
    ('Curso de idiomas', 'Lunes, miércoles y viernes de 19:00 a 21:00', 1200000.00, '2023-04-22'),
    ('Taller de fotografía', 'Sábados de 10:00 a 13:00', 6000000, '2023-06-08');

--Obteniendo costo total de todas las capacitaciones.
SELECT SUM(costo_realizacion)
AS costo_total
FROM capacitacion;
--Obteniendo los 3 operadores mas recientes creados.
SELECT * 
FROM operadores
ORDER BY fecha_creacion DESC 
LIMIT 3;
--Obteniendo los 3 usuarios mas recientes creados.
SELECT * 
FROM usuarios
ORDER BY fecha_creacion DESC 
LIMIT 3;
--Obteniendo los dias transcurridos desde la fecha de cracion de operadores.
SELECT rut, nombre, apellido , AGE(CURRENT_DATE, fecha_creacion)
AS dias_transcurridos
FROM operadores;

--Obteniendo los dias transcurridos desde la fecha realizacion de capacitacion.
SELECT CURRENT_DATE - MAX(fecha_realizacion)
AS dias_transcurridos
FROM capacitacion;

--Capacitacion mas costoso:
SELECT nombre, costo_realizacion
FROM capacitacion
WHERE costo_realizacion = (SELECT MAX(costo_realizacion)FROM capacitacion);

--Capacitacion menos costoso:
SELECT nombre, costo_realizacion
FROM capacitacion
WHERE costo_realizacion = (SELECT MIN(costo_realizacion)FROM capacitacion);