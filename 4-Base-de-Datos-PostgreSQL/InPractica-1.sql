--CREAR USUARIO Y CONTRASEÑA:
CREATE USER explorador WITH password 'explorador';
--DANDO PERMISOS DE LECTURA Y ESCRITURA
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO explorador;
--VER LAS TABLAS CON EL USURIO CREADO
\dt
--3
--¿Cuántas ciudades existen en la base de datos?
SELECT COUNT(*) FROM city;
--Existen 4079 ciudades
--Si se ordenan los países de acuerdo con su nombre ¿cuál sería el primero y cuál el último?
SELECT * FROM country ORDER BY name ASC LIMIT 1;
--el primero pais es Afghanistan
SELECT * FROM country ORDER BY name DESC LIMIT 1;
--el segundo pais es Zimbabwe
--Tomando en cuenta todos los países de Sudamérica ¿cuántas ciudades existen entre todos ellos?
SELECT COUNT(*) FROM country inner JOIN city on (countrycode=code ) WHERE region='South America';
--ciudades sur america 470
--Considerando todos los idiomas declarados en la base, ¿cuántos idiomas corresponden a países de Sudamérica?
SELECT COUNT(*) FROM country inner JOIN countrylanguage on (countrycode=code ) WHERE region='South America';
-- corresponden 42 idiomas en Sudamérica
--4
--creando database.
CREATE DATABASE asistentes_capacitacion;

--creando tablas.
CREATE TABLE operacodres(
    rut TEXT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL
);
CREATE TABLE usuarios(
    id_coder SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    telefono VARCHAR(9) NOT NULL
);
CREATE TABLE capacitacion(
    codigo_curso VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    horario TEXT NOT NULL
);
--insertando informacion en las tablas.
-- Tabla "operacodres"
INSERT INTO operacodres (rut, nombre, apellido, direccion, correo_electronico) 
VALUES 
    ('123456789', 'Juan', 'Pérez', 'Calle 123', 'juanperez@example.com'),
    ('987654321', 'María', 'González', 'Avenida 456', 'mariagonzalez@example.com'),
    ('456789123', 'Pedro', 'López', 'Plaza 789', 'pedrolopez@example.com'),
    ('789123456', 'Ana', 'Rodríguez', 'Calle 456', 'anarodriguez@example.com'),
    ('654321987', 'Carlos', 'Sánchez', 'Avenida 123', 'carlossanchez@example.com');

-- Tabla "usuarios"
INSERT INTO usuarios (nombre, apellido, correo_electronico, telefono) 
VALUES 
    ('Juan', 'Pérez', 'juanperez@example.com', '123456789'),
    ('María', 'González', 'mariagonzalez@example.com', '987654321'),
    ('Pedro', 'López', 'pedrolopez@example.com', '456789123'),
    ('Ana', 'Rodríguez', 'anarodriguez@example.com', '789123456'),
    ('Carlos', 'Sánchez', 'carlossanchez@example.com', '654321987');

-- Tabla "capacitacion"
INSERT INTO capacitacion (codigo_curso, nombre, horario) 
VALUES 
    ('C001', 'Curso de programación', 'Lunes y miércoles de 18:00 a 20:00'),
    ('C002', 'Taller de diseño gráfico', 'Martes y jueves de 15:00 a 17:00'),
    ('C003', 'Seminario de marketing digital', 'Viernes de 9:00 a 12:00'),
    ('C004', 'Curso de idiomas', 'Lunes, miércoles y viernes de 19:00 a 21:00'),
    ('C005', 'Taller de fotografía', 'Sábados de 10:00 a 13:00');

--5
--¿Cuántas películas están registradas?
SELECT * FROM film;
SELECT COUNT(*) FROM film;
--1000 peliculas estan registradas.

--¿Cuántos clientes existen en la base de datos?
SELECT * FROM customer;
SELECT COUNT(*) FROM customer;
--599 clientes registrados.

--¿Cuántos títulos existen en inventario?
SELECT * FROM inventory;
SELECT COUNT(*) FROM inventory;
--existen 4581 titulos en el inventario.

--¿Cuál es la película más arrendada?
SELECT film.title, COUNT(*) AS cantidad_arriendos
FROM film
JOIN inventory ON film.film_id = inventory.film_id
JOIN rental ON inventory.inventory_id = rental.inventory_id
GROUP BY film.title
ORDER BY COUNT(*) DESC
LIMIT 1;
-- La película más arrendada es "BUCKET BROTHERHOOD".