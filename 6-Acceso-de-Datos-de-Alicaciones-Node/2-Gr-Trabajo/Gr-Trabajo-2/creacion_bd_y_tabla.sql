CREATE DATABASE escuela;

CREATE TABLE estudiante(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(250),
    rut VARCHAR(250),
    curso VARCHAR(250),
    nivel VARCHAR(250)
);
