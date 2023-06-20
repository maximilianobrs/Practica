--1
-- Creando una base de datos

CREATE DATABASE transacciones;

-- Creando un usuario con todos los privilegios para trabajar con la base de datos recién creada.

CREATE USER admin_transaccion WITH PASSWORD '12345'
GRANT ALL PRIVILEGES ON SCHEMA transacciones TO admin_transaccion;

--2
-- Creando dos tablas en la base de datos. La primera almacena todos los usuarios sin una participación activa en tu aplicación y la segunda agrupa a los usuarios que son considerados especiales, debido a su alta participación en tu aplicación web.

CREATE TABLE usuarios (
    pk_id VARCHAR(5) NOT NULL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    genero VARCHAR(10) NOT NULL,
);

CREATE TABLE especial_user(
    pk_id VARCHAR(5) NOT NULL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    genero VARCHAR(10) NOT NULL,
);

-- La primera tabla tiene 5 usuarios en un comienzo.
-- La segunda tabla no tiene usuarios.

INSERT INTO usuarios (pk_id, nombre, apellido, email, telefono, genero) VALUES
('U-001', 'Juan', 'Pérez', 'juan.perez@example.com', '987654321', 'Masculino'),
('U-002', 'Fernanda', 'López', 'fernanda.lopez@example.com', '123456789', 'Femenino'),
('U-003', 'Fernando', 'García', 'fernando.garcia@example.com', '654321987', 'Masculino'),
('U-004', 'Anabell', 'Martínez', 'anabell.martinez@example.com', '789456123', 'Femenino'),
('U-005', 'Luis', 'Rodríguez', 'luis.rodriguez@example.com', '369258147', 'Masculino');

-- Transfiriendo tres usuarios desde la primera tabla a la segunda.

BEGIN TRANSACTION;

    INSERT INTO especial_user (pk_id, nombre, apellido, email, telefono, genero)
    SELECT pk_id, nombre, apellido, email, telefono, genero
    FROM usuarios
    WHERE pk_id IN ('U-001');
    
    DELETE FROM usuarios WHERE pk_id IN ('U-001');

COMMIT;

BEGIN TRANSACTION;

    INSERT INTO especial_user (pk_id, nombre, apellido, email, telefono, genero)
    SELECT pk_id, nombre, apellido, email, telefono, genero
    FROM usuarios
    WHERE pk_id IN ('U-002');

    DELETE FROM usuarios WHERE pk_id IN ('U-002');
COMMIT;

-- Anulando la transferencia del tercer usuario.
BEGIN TRANSACTION;

    INSERT INTO especial_user (pk_id, nombre, apellido, email, telefono, genero)
    SELECT pk_id, nombre, apellido, email, telefono, genero
    FROM usuarios
    WHERE pk_id IN ('U-003');

    DELETE FROM usuarios WHERE pk_id IN ('U-003');

ROLLBACK;
