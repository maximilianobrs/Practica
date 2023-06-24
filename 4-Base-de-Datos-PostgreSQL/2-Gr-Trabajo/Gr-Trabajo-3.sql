-- Actualización de tablas.
-- A. Ingrese 5 vendedores.
INSERT INTO vendedor VALUES
('123543255', 'Juan', 'Pérez', '1990-05-15', 'Sección A', 250000),
('762454567', 'María', 'González', '1992-11-25', 'Sección B', 280000),
('754754246', 'Carlos', 'López', '1985-08-10', 'Sección C', 350000),
('756437234', 'Laura', 'Martínez', '1998-02-02', 'Sección A', 140000),
('131435764', 'Pedro', 'Rodríguez', '1994-07-20', 'Sección B', 280000);

-- B. Ingrese 5 clientes.
INSERT INTO cliente VALUES
('COD0000021', 'Juan', 'Pérez', '987654321', 'Calle 123', 'Santiago', 'juan@example.com', '2022-01-01', 1500000),
('COD0000022', 'María', 'González', '987123456', 'Avenida 456', 'Valparaíso', 'maria@example.com', '2022-02-15', 2200000),
('COD0000023', 'Carlos', 'López', '912345678', 'Ruta 789', 'Concepción', 'carlos@example.com', '2022-03-20', 1800000),
('COD0000024', 'Laura', 'Martínez', '934567890', 'Pasaje 012', 'La Serena', 'laura@example.com', '2022-04-10', 1200000),
('COD0000025', 'Pedro', 'Rodríguez', '956789012', 'Callejón 345', 'Antofagasta', 'pedro@example.com', '2022-05-05', 2500000);

-- C. Ingrese 5 productos.
INSERT INTO producto VALUES
('SKU0000021', 'Camiseta de algodón', 'Ropa', 'Fabricante A', 50, 15000),
('SKU0000022', 'Pantalón de mezclilla', 'Ropa', 'Fabricante B', 30, 25000),
('SKU0000023', 'Zapatos deportivos', 'Calzado', 'Fabricante C', 20, 35000),
('SKU0000024', 'Bolso de cuero', 'Accesorios', 'Fabricante D', 15, 50000),
('SKU0000025', 'Reloj de acero inoxidable', 'Accesorios', 'Fabricante E', 10, 70000);

-- Manipulación de datos - Consultas SQL.
-- D. Identifique cual es el salario mínimo entre vendedores.
-- SELECT MIN(salario) FROM vendedor;

-- E. Identifique cual es el salario máximo entre vendedores.
-- SELECT MAX(salario) FROM vendedor;

-- F. Súmele el salario mínimo identificado al salario de todos los vendedores.
-- UPDATE vendedor SET salario = salario + (SELECT MIN(salario) FROM vendedor);

-- G. Elimine el producto más caro del inventario.
-- DELETE FROM producto WHERE precio = (SELECT MAX(precio) FROM producto);

-- H. Cree una tabla que contenga solo los clientes que han pagado más que el promedio.
-- CREATE TABLE cliente_pagado AS SELECT * FROM cliente WHERE total_pagado > (SELECT AVG(total_pagado) FROM cliente);

-- I. Actualice los datos de tres productos.
-- UPDATE producto SET stock = 60 WHERE sku = 'SKU0000021';
-- UPDATE producto SET stock = 20 WHERE sku = 'SKU0000022';
-- UPDATE producto SET stock = 15 WHERE sku = 'SKU0000023';

-- J. Actualice los datos de tres vendedores.
-- UPDATE vendedor SET salario = 300000 WHERE rut = '123543255';
-- UPDATE vendedor SET salario = 320000 WHERE rut = '762454567';
-- UPDATE vendedor SET salario = 380000 WHERE rut = '754754246';

-- K. Actualice los datos de 1 cliente.
-- UPDATE cliente SET total_pagado = 2000000 WHERE codigo = 'COD0000021';

-- L. Seleccione el nombre y el apellido de los vendedores que tienen un salario superior al promedio.
-- SELECT nombres, apellidos FROM vendedor WHERE salario > (SELECT AVG(salario) FROM vendedor);

-- M. Indique cuál es el cliente con mayor gasto.
-- SELECT * FROM cliente WHERE total_pagado = (SELECT MAX(total_pagado) FROM cliente);
