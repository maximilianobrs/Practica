CREATE DATABASE usuarios;

CREATE TABLE registros (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(200) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL
);