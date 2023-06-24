-- Paso 1
CREATE DATABASE grupal;
CREATE USER grupal WITH PASSWORD 'grupal';

-- Paso 2
CREATE TABLE usuario (
	id_usuario SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	apellido VARCHAR(50) NOT NULL,
	contrasena VARCHAR(16) NOT NULL,
	zona_horaria VARCHAR(10) NOT NULL DEFAULT 'UTC-3',
	genero VARCHAR(50) NOT NULL,
	telefono_contacto VARCHAR(50) NOT NULL
)

CREATE TABLE ingreso (
	id_ingreso SERIAL PRIMARY KEY,
	id_usuario INTEGER NOT NULL,
	fecha_ingreso TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
)

-- Paso 3
ALTER TABLE usuario ALTER COLUMN zona_horaria SET DEFAULT 'UTC-2';

-- Paso 4
INSERT INTO usuario VALUES
(1, 'Juan', 'Gomez', '123456', 'UTC-3', 'Masculino', '555-1234'),
(2, 'María', 'Rodríguez', 'abcdef', 'UTC-3', 'Femenino', '555-5678'),
(3, 'Carlos', 'López', 'qwerty', 'UTC-3', 'Masculino', '555-9876'),
(4, 'Laura', 'Torres', '098765', 'UTC-3', 'Femenino', '555-4321'),
(5, 'Pedro', 'Fernández', 'asdfgh', 'UTC-3', 'Masculino', '555-8765'),
(6, 'Ana', 'Pérez', 'zxcvbn', 'UTC-3', 'Femenino', '555-2109'),
(7, 'Sergio', 'González', 'qazwsx', 'UTC-3', 'Masculino', '555-6543'),
(8, 'Marta', 'Jiménez', 'poiuyt', 'UTC-3', 'Femenino', '555-9087');

INSERT INTO ingreso VALUES 
(1, 1, CURRENT_TIMESTAMP),
(2, 8, CURRENT_TIMESTAMP),
(3, 3, CURRENT_TIMESTAMP),
(4, 7, CURRENT_TIMESTAMP),
(5, 2, CURRENT_TIMESTAMP),
(6, 6, CURRENT_TIMESTAMP),
(7, 4, CURRENT_TIMESTAMP),
(8, 5, CURRENT_TIMESTAMP);

-- Paso 5
-- id_usuario SERIAL PRIMARY KEY
-- El tipo serial es usado para crear llaves primarias autoincrementales, para asi sea unica a nivel de la tabla.

-- nombre VARCHAR(50) NOT NULL,
-- El tipo varchar, permite guardar texto, en este caso esta restringido a 50 caracteres.

-- apellido VARCHAR(50) NOT NULL,
-- El tipo varchar, permite guardar texto, en este caso esta restringido a 50 caracteres.

-- contrasena VARCHAR(16) NOT NULL,
-- El tipo varchar, permite guardar texto, en este caso esta restringido a 16 caracteres.

-- zona_horaria VARCHAR(10) NOT NULL DEFAULT 'UTC-3',
-- El tipo varchar, permite guardar texto, en este caso esta restringido a 10 caracteres.

-- genero VARCHAR(10) NOT NULL,
-- El tipo varchar, permite guardar texto, en este caso esta restringido a 10 caracteres.

-- telefono_contacto VARCHAR(15) NOT NULL,
-- El tipo varchar, permite guardar texto, en este caso esta restringido a 15 caracteres.

-- id_ingreso SERIAL PRIMARY KEY,
-- El tipo serial es usado para crear llaves primarias autoincrementales, para asi sea unica a nivel de la tabla.

-- id_usuario INTEGER NOT NULL,
-- Dado que el tipo serial crea un int unico en la tabla usuario, es necesario usar int, para asi poder hacer una referencia a otra tabla, en este caso la de usuario.

-- fecha_ingreso TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- Si, ya que crea un registro de fecha y hora.

-- Paso 6
CREATE TABLE contacto (
	id_contacto SERIAL PRIMARY KEY,
	id_usuario INT NOT NULL,
	numero_telefono VARCHAR(15) NOT NULL,
	correo VARCHAR(100) NOT NULL,

	FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
)

-- Paso 7
ALTER TABLE usuario DROP COLUMN telefono_contacto;

-- EXTRA
INSERT INTO contacto VALUES
(1, 3, '983645723', 'carlos@mail.com'),
(2, 5, '972653842', 'pedro@mail.com'),
(3, 3, '912673567', 'carlos@mail.com');