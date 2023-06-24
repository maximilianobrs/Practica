-- La base de datos debe ser local, y debe tener por nombre “telovendo”.

CREATE DATABASE telovendo;

/*

Debes crear un usuario de nombre “admintienda”, con una clase determinada por ti. Este usuario
debe tener permisos totales sobre la base de datos anteriormente creada.

*/

CREATE USER admintienda password 'admintienda';

GRANT ALL PRIVILEGES ON SCHEMA telovendo TO admintienda;

-- Dentro de la base creada debes incluir tres tablas:

/*
A. Cliente: todo cliente se identifica con un código único, sus nombres, sus apellidos, un teléfono,
su dirección, su comuna, el correo electrónico y fecha de registro. Recuerden incluir el tipo de dato,
número máximo de caracteres (en caso de ser necesario).

B. Producto: por cada producto se debe conocer su identificador de producto (SKU), su nombre, la
categoría, quien lo produce y la cantidad existente en stock.

C. Vendedor: se compone de RUN, nombre, apellidos, fecha de nacimiento y la sección a la que pertenece. Utilicen
su imaginación para crear las secciones. Inserten en la tabla al menos 10 registros distintos.
*/
CREATE TABLE cliente(
    codigo_unico INT,
    nombres VARCHAR(60),
    apellidos VARCHAR(60),
    telefono VARCHAR(9),
    direccion VARCHAR(255),
    fecha_registro DATE,
    PRIMARY KEY (codigo_unico)
);

CREATE TABLE producto(
    SKU INT,
    nombre VARCHAR(60),
    categoria VARCHAR(60),
    fabricante VARCHAR(60),
    cantidad_stock INT,
    PRIMARY KEY (SKU)
);

CREATE TABLE vendedor(
    rut VARCHAR(10),
    nombres VARCHAR(60),
    apellidos VARCHAR(60),
    fecha_nacimiento DATE,
    seccion VARCHAR(50),
    PRIMARY KEY (rut)
);

INSERT INTO cliente (codigo_unico, nombres, apellidos, telefono, direccion, comuna , fecha_registro)
VALUES
(1, 'Juan', 'Pérez', '123456789', 'Calle 123', '2023-05-01'),
(2, 'María', 'López', '987654321', 'Avenida 456', '2023-05-02'),
(3, 'Pedro', 'González', '555555555', 'Ruta 789', '2023-05-03'),
(4, 'Ana', 'Rodríguez', '999999999', 'Avenida Principal', '2023-05-04'),
(5, 'Luis', 'Hernández', '111111111', 'Calle Secundaria', '2023-05-05'),
(6, 'Laura', 'Fernández', '222222222', 'Ruta 123', '2023-05-06'),
(7, 'Carlos', 'Gómez', '333333333', 'Avenida Central', '2023-05-07'),
(8, 'Sofía', 'Martínez', '444444444', 'Calle Principal', '2023-05-08'),
(9, 'Andrés', 'Sánchez', '555555555', 'Ruta Principal', '2023-05-09'),
(10, 'Paula', 'Vargas', '666666666', 'Avenida 789', '2023-05-10');

INSERT INTO Producto (SKU, nombre, categoría, fabricante, cantidad_stock)
VALUES
('SKU001', 'Camiseta', 'Ropa', 'Fabricante A', 100),
('SKU002', 'Zapatos', 'Calzado', 'Fabricante B', 50),
('SKU003', 'Bolso', 'Accesorio', 'Fabricante C', 20),
('SKU004', 'Pantalón', 'Ropa', 'Fabricante D', 80),
('SKU005', 'Reloj', 'Accesorio', 'Fabricante E', 30),
('SKU006', 'Gorra', 'Accesorio', 'Fabricante F', 40),
('SKU007', 'Blusa', 'Ropa', 'Fabricante G', 60),
('SKU008', 'Zapatillas', 'Calzado', 'Fabricante H', 70),
('SKU009', 'Bufanda', 'Accesorio', 'Fabricante I', 25),
('SKU010', 'Vestido', 'Ropa', 'Fabricante J', 90);

INSERT INTO vendedor (rut, nombres, apellidos, fecha_nacimiento, seccion)
VALUES
('12345678-9', 'Carlos', 'Gómez', '1990-01-10', 'Electrónica'),
('98765432-1', 'Laura', 'Fernández', '1985-03-15', 'Deportes'),
('65432198-7', 'Roberto', 'Sánchez', '1995-07-20', 'Moda'),
('11111111-1', 'María', 'López', '1992-12-05', 'Hogar'),
('22222222-2', 'Pedro', 'González', '1991-09-18', 'Electrodomésticos'),
('33333333-3', 'Ana', 'Rodríguez', '1994-06-25', 'Juguetes'),
('44444444-4', 'Luis', 'Hernández', '1988-04-02', 'Muebles'),
('55555555-5', 'Sofía', 'Martínez', '1993-11-15', 'Decoración'),
('66666666-6', 'Andrés', 'Sánchez', '1997-08-20', 'Belleza'),
('77777777-7', 'Paula', 'Vargas', '1987-02-12', 'Librería');


/*
a. ¿Qué tipo de datos les permite guardar fechas?¿Y horas?

date, time, timestamp

b. ¿Qué utilidad tiene especificar el número de caracteres en SQL?

especificar el numero de caracteres en SQL es util para determinar la longitud maxima que puede tener.

c. Por último, definan el acrónimo CRUD.

CRUD es el acrónimo de Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar).

d. Qué palabra clave se utiliza para:
- Mostrar bases de datos en SQL.

\dt

- Describir una base de datos en SQL.

Las bases de datos SQL es una recopilacion de informacion o datos que se almacenan de forma electronica, comunmente se detallan como nombre de base de datos, las tablas presente en ella y sus columnas.

- Seleccionar una base de datos.

\c

- Crear una tabla.

CREATE TABLE usuarios (rut, nombre PRIMARY KEY (rut));

- ¿Qué es una primary key? y una foreign key?
La Primary key identifica de manera unica el registro de la tabl, en cienta forma actua como padre 

foreign key establece la relacionentre tablas mediante la primary key de la otra tabla y actuaria como hijo del padre 

- Que diferencias hay entre utilizar MySQL shell y MySQL Workbench.

PostgreSQL Shell es una interfaz de línea de comandos para acceder y administrar PostgreSQL de manera rápida y directa.

PostgreSQL Workbench es una herramienta de interfaz gráfica más completa y visualmente atractiva para tareas avanzadas de desarrollo y administración de bases de datos PostgreSQL

*/