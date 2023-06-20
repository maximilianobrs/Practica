
--1
-- Creando una base de datos
CREATE DATABASE individual5;
-- Creando un usuario con todos los privilegios para trabajar con la base de datos recién creada.
CREATE USER administrador_5 WITH PASSWORD '12345';
GRANT ALL PRIVILEGES ON SCHEMA individual5 TO administrador_5;

--2 CREAR TABLAS:
-- La primera almacena a los usuarios de la aplicación (id_usuario, nombre, apellido, contraseña, zona horaria (por defecto UTC-3), género y teléfono de contacto).
CREATE TABLE usuario(
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    zona_horaria TIMESTAMP NOT NULL DEFAULT 'UTC-3',
    telefono VARCHAR(9) NOT NULL
);
-- La segunda tabla almacena información relacionada a la fecha-hora de ingreso de los usuarios a la plataforma (id_ingreso, id_usuario y la fecha-hora de ingreso (por defecto la fecha-hora actual)).
CREATE TABLE hora_ingreso(
    id_ingreso SERIAL PRIMARY KEY,
    id_usuario SERIAL NOT NULL, 
    fecha_ingreso TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
-- La tercera tabla almacena información sobre la cantidad de veces que los usuarios han visitado la aplicación. Piense en una estructura de columnas que permita entregar esta información y cree la tabla.
CREATE TABLE visitas(
    id_usuario SERIAL NOT NULL,
    cantidad_visita INT NOT NULL DEFAULT 0;
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

--3
-- Para cada tabla se crean 8 registros.
INSERT INTO usuario (nombre, apellido, contrasenia, zona_horaria, telefono)
VALUES (1,'Juan', 'Pérez', 'abc123', '2023-06-03 10:00:00', '123456789'),
       (2,'María', 'Gómez', 'pass123', '2023-06-03 11:30:00', '987654321'),
       (3,'Luis', 'Rodríguez', 'qwerty', '2023-06-03 12:45:00', '555222111'),
       (4,'Ana', 'López', 'password', '2023-06-03 14:15:00', '333444555'),
       (5,'Pedro', 'Martínez', 'securepass', '2023-06-03 16:00:00', '777888999'),
       (6,'Laura', 'Hernández', '12345678', '2023-06-03 18:30:00', '111000222'),
       (7,'Carlos', 'González', 'abcd1234', '2023-06-03 20:45:00', '666777888'),
       (8,'Sofía', 'Silva', 'pass1234', '2023-06-03 22:15:00', '999888777');

INSERT INTO hora_ingreso (id_ingreso,id_usuario,fecha_ingreso)
VALUES (1,6, CURRENT_TIMESTAMP),
       (2,2, CURRENT_TIMESTAMP),
       (3,3, CURRENT_TIMESTAMP),
       (4,7, CURRENT_TIMESTAMP),
       (5,5, CURRENT_TIMESTAMP),
       (6,1, CURRENT_TIMESTAMP),
       (7,4, CURRENT_TIMESTAMP),
       (8,8, CURRENT_TIMESTAMP);

INSERT INTO visitas (id_usuario, cantidad_visita)
VALUES (1, 3),
       (2, 5),
       (3, 1),
       (4, 2),
       (5, 4),
       (6, 6),
       (7, 2),
       (8, 3);

--4
--Eliminado una de las tablas creadas.
DROP TABLE visitas;

--*Justificando cada tipo de dato utilizado en la creación de las tablas.

    --PRIMARY KEY:Es utilizada para definir la clave primaria de la tabla que sera unica y no repetible.

    --FOREIGN KEY: Se utiliza para crear la relacion entre las dos tablas.

    --REFERENCES:Para indicar que tabla y columna con la cual se esta referenciando como clave primaria.

    --SERIAL:Es un tipo de dato usado pora crear claves primarias, y se utiliza para generar numeros secuenciales.

    --VARCHAR: nos permite dar una cantidad especifica de el largo de caracteres que queremos permitir en el campo.

    --INT:Para representar los numeros enteros.

    --TIMESTAMP: Es utilizado para almacenar fecha y hora.

    --NOT NULL: Se utiliza para que los campos no puedan contener un valor nulo.

    --DEFAULT:Se usa para darle un valor predeterminado si no se a especificado el valor.
