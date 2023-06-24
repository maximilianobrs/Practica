/*
DESARROLLO - Continuación del trabajo.
Como parte de este ejercicio se necesita crear una base de datos MySQL, que dé respuesta a las
necesidades que serán planteadas en experiencias posteriores.
En base a la base de datos creada en la sesión. Debes considerar lo siguiente:
Actualización de tablas.

*/
-- A. A la tabla productos agregue el atributo Precio.
ALTER TABLE productos
ADD Precio NUMERIC;

--B. A la tabla vendedores agregue el atributo Salario.

ALTER TABLE vendedores
ADD Salario NUMERIC;

--C. A la tabla clientes agregue el atributo Total pagado.

ALTER TABLE clientes
ADD Total_pagado NUMERIC;

--D. Ingrese 10 vendedores.

UPDATE vendedores
SET salario = CASE
    WHEN nombres = 'María' THEN 1000000
    WHEN nombres = 'Carlos' THEN 1500000
    WHEN nombres = 'Pedro' THEN 1200000
    WHEN nombres = 'Ana' THEN 900000
    WHEN nombres = 'Luis' THEN 1800000
    WHEN nombres = 'Sofía' THEN 1100000
    WHEN nombres = 'Roberto' THEN 1300000
    WHEN nombres = 'Andrés' THEN 1600000
    WHEN nombres = 'Paula' THEN 1400000
    WHEN nombres = 'Laura' THEN 1700000
    ELSE salario
END
WHERE nombres IN ('María', 'Carlos', 'Pedro', 'Ana', 'Luis', 'Sofía', 'Roberto', 'Andrés', 'Paula', 'Laura');

--E. Ingrese 15 clientes.
UPDATE clientes
SET total_pagado = CASE
    WHEN nombres = 'Juan' THEN 50000
    WHEN nombres = 'María' THEN 100000
    WHEN nombres = 'Pedro' THEN 75000
    WHEN nombres = 'Ana' THEN 120000
    WHEN nombres = 'Luis' THEN 90000
    WHEN nombres = 'Laura' THEN 80000
    WHEN nombres = 'Carlos' THEN 60000
    WHEN nombres = 'Sofía' THEN 70000
    WHEN nombres = 'Andrés' THEN 95000
    WHEN nombres = 'Paula' THEN 85000
    ELSE total_pagado
END
WHERE nombres IN ('Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Laura', 'Carlos', 'Sofía', 'Andrés', 'Paula');

INSERT INTO clientes (codigo_unico, nombres, apellidos, telefono, direccion, fecha_registro, total_pagado)
VALUES
(11, 'Fernando', 'García','423452352', 'Calle 456', '2023-05-11', 70000),
(12, 'Gabriela', 'Silva','423442352', 'Avenida 789', '2023-05-12', 85000),
(13, 'Diego', 'Pérez','423432352', 'Ruta 123', '2023-05-13', 60000),
(14, 'Valentina', 'Hernández','498452352', 'Calle Principal', '2023-05-14', 75000),
(15, 'Ricardo', 'López','423487352', 'Avenida Central', '2023-05-15', 90000);

--F. Ingrese 10 productos.
UPDATE productos
SET Precio = CASE
    WHEN nombre = 'Camiseta' THEN 10000
    WHEN nombre = 'Zapatos' THEN 50000
    WHEN nombre = 'Bolso' THEN 25000
    WHEN nombre = 'Pantalón' THEN 30000
    WHEN nombre = 'Reloj' THEN 150000
    WHEN nombre = 'Gorra' THEN 8000
    WHEN nombre = 'Blusa' THEN 20000
    WHEN nombre = 'Zapatillas' THEN 60000
    WHEN nombre = 'Bufanda' THEN 12000
    WHEN nombre = 'Vestido' THEN 45000
    ELSE Precio
END
WHERE nombre IN ('Camiseta', 'Zapatos', 'Bolso', 'Pantalón', 'Reloj', 'Gorra', 'Blusa', 'Zapatillas', 'Bufanda', 'Vestido');
--Análisis exploratorio - Consultas SQL.
--G. Seleccione los vendedores que tienen un salario superior al promedio.
SELECT *
FROM vendedores
WHERE salario > (SELECT AVG(salario) FROM vendedores);
--H. Seleccione los productos más caros que el promedio.
SELECT *
FROM productos
WHERE precio > (SELECT AVG(precio) FROM productos);
--I. Seleccione los clientes que han pagado más que el promedio.
SELECT *
FROM clientes
WHERE total_pagado > (SELECT AVG(total_pagado) FROM clientes);
--J. Indique cuántos vendedores tienen un salario inferior al promedio.
SELECT *
FROM productos
WHERE precio < (SELECT AVG(precio) FROM productos);
--K. Indique cuántos productos son más baratos que el promedio.
SELECT COUNT(*)
FROM productos
WHERE precio < (SELECT AVG(precio) FROM productos);


--L. Seleccione el nombre y el apellido de los vendedores que tienen un salario superior al promedio.
SELECT nombres, apellidos
FROM vendedores
WHERE salario > (SELECT AVG(salario) FROM vendedores);

--M. Indique cuál es el producto más barato y el producto más caro del inventario.
SELECT *
FROM productos
WHERE precio = (SELECT MIN(precio) FROM productos)
   OR precio = (SELECT MAX(precio) FROM productos);

--N. Indique cual es el costo de comprar uno de cada producto en el inventario.

SELECT SUM(precio) AS costo_total
FROM productos;

--O. Identifique la comuna que tiene más clientes registrados.
SELECT SUM(precio) FROM productos;
--P. Identifique los productos que tienen más de 5 unidades en stock.
SELECT *
FROM productos
WHERE stock > 5;

--● ¿Qué utilidad tiene el campo AUTO INCREMENT al definir una columna de atributo?

-- El campo AUTO INCREMENT en la definición de una columna de atributo en una base de datos permite que la base de datos genere automáticamente valores únicos y secuenciales para esa columna.

--¿En qué casos crees que es útil?

-- Es útil para generar identificadores únicos, simplificar inserciones, establecer claves primarias y ordenar registros. Proporciona conveniencia y asegura la unicidad de los valores en la columna.