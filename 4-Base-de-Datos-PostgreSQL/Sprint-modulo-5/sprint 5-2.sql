-- Crear la tabla de proveedores
CREATE TABLE Proveedores (
  proveedor_id SERIAL PRIMARY KEY,
  nombre_rep_legal VARCHAR(50),
  nombre_corporativo VARCHAR(100),
  nombre_contacto VARCHAR(50),
  categoria VARCHAR(50),
  correo_factura VARCHAR(100)
);

-- Crear la tabla de telefonos_proveedores
CREATE TABLE Telefonos_Proveedores (
  telefono_id SERIAL PRIMARY KEY,
  proveedor_id INT,
  telefono VARCHAR(15),
  nombre_recibe_llamadas VARCHAR(50),
  FOREIGN KEY (proveedor_id) REFERENCES Proveedores (proveedor_id)
);

-- Insertar 5 proveedores
INSERT INTO Proveedores (nombre_rep_legal, nombre_corporativo, nombre_contacto, categoria, correo_factura)
VALUES
  ('John Smith', 'Electronics Inc.', 'Alex Johnson', 'Electrónicos', 'johnsmith@electronics.com'),
  ('Emma Davis', 'Tech Solutions', 'Daniel Brown', 'Electrónicos', 'emmadavis@techsolutions.com'),
  ('Michael Johnson', 'Gadget World', 'Jennifer Thompson', 'Electrónicos', 'michaeljohnson@gadgetworld.com'),
  ('Sophia Wilson', 'Innovative Tech', 'David Lee', 'Electrónicos', 'sophiawilson@innovativetech.com'),
  ('Robert Anderson', 'Global Electronics', 'Jessica Davis', 'Electrónicos', 'robertanderson@globalelectronics.com');

-- Insertar los teléfonos de los proveedores
INSERT INTO Telefonos_Proveedores (proveedor_id, telefono, nombre_recibe_llamadas)
VALUES
  (1, '5551234567', 'Recepción'),
  (1, '5559876543', 'Soporte Técnico'),
  (2, '5552345678', 'Recepción'),
  (2, '5558765432', 'Atención al Cliente'),
  (3, '5553456789', 'Recepción'),
  (3, '5557654321', 'Sala de Venta'),
  (4, '5554567890', 'Recepción'),
  (4, '5556543210', 'Soporte Técnico'),
  (5, '5555678901', 'Atención al Cliente'),
  (5, '5554321098', 'Sala de Venta');

-- Crear la tabla de clientes
CREATE TABLE Clientes (
  cliente_id SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  direccion VARCHAR(100)
);

-- Insertar 5 clientes de ejemplo
INSERT INTO Clientes (nombre, apellido, direccion)
VALUES
  ('Juan', 'García', 'Calle Principal 123'),
  ('María', 'López', 'Avenida Central 456'),
  ('Carlos', 'Martínez', 'Plaza Mayor 789'),
  ('Laura', 'Rodríguez', 'Paseo del Sol 987'),
  ('Pedro', 'Hernández', 'Callejón del Parque 654');

-- Crear la tabla de productos
CREATE TABLE Productos (
  producto_id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  categoria VARCHAR(50),
  proveedor_id INT,
  precio_clp BIGINT,
  stock INT,
  color VARCHAR(50),
  FOREIGN KEY (proveedor_id) REFERENCES Proveedores (proveedor_id)
);

-- Insertar 10 productos de ejemplo
INSERT INTO Productos (nombre, categoria, proveedor_id, precio_clp, stock, color)
VALUES
  ('Televisor LED', 'Electrónicos', 1, 499990, 20, 'Negro'),
  ('Smartphone', 'Electrónicos', 2, 899990, 30, 'Plateado'),
  ('Laptop', 'Electrónicos', 3, 1299990, 25, 'Gris'),
  ('Cámara DSLR', 'Electrónicos', 4, 899990, 10, 'Negro'),
  ('Auriculares inalámbricos', 'Electrónicos', 5, 149990, 40, 'Blanco'),
  ('Reloj inteligente', 'Electrónicos', 1, 199990, 15, 'Negro'),
  ('Altavoz Bluetooth', 'Electrónicos', 2, 79990, 25, 'Rojo'),
  ('Tablet', 'Electrónicos', 3, 399990, 15, 'Azul'),
  ('Impresora multifuncional', 'Electrónicos', 4, 299990, 12, 'Blanco'),
  ('Consola de videojuegos', 'Electrónicos', 5, 499990, 20, 'Negro');


-- Cuál es la categoría de productos que más se repite:
SELECT categoria, COUNT(*) AS repeticiones
FROM Productos
GROUP BY categoria
ORDER BY repeticiones DESC
LIMIT 1;

-- Cuáles son los productos con mayor stock:
SELECT *
FROM Productos
WHERE stock = (SELECT MAX(stock) FROM Productos);

-- Qué color de producto es más común en nuestra tienda:
SELECT color, COUNT(*) AS repeticiones
FROM Productos
GROUP BY color
ORDER BY repeticiones DESC
LIMIT 1;

-- Cual o cuales son los proveedores con menor stock de productos:
SELECT p.nombre_corporativo, p.stock
FROM Proveedores p
JOIN Productos pr ON p.proveedor_id = pr.proveedor_id
WHERE pr.stock = (SELECT MIN(stock) FROM Productos);

-- Para cambiar la categoría de productos más popular por 'Electrónica y computación':
UPDATE Productos
SET categoria = 'Electrónica y computación'
WHERE categoria = (SELECT categoria FROM Productos GROUP BY categoria ORDER BY COUNT(*) DESC LIMIT 1); 