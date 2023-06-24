CREATE DATABASE transacciones;
CREATE USER administrador WITH PASSWORD '12345';
GRANT ALL PRIVILEGES ON SCHEMA  transacciones TO administrador;


CREATE TABLE cuenta(
	usuario VARCHAR(9) PRIMARY KEY,
	saldo INTEGER
);


INSERT INTO cuenta VALUES 
('USUARIO-A', 400),
('USUARIO-B', 200),
('USUARIO-C', 600),
('USUARIO-D', 1000);


-- Transfiera 200 TLV Coins desde un usuario A un usuario B.
BEGIN TRANSACTION;
-- Verificar que la cuenta tenga saldo suficiente.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-A' AND saldo >= 200;
-- Verificar que la cuenta de destino exista.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-B';
-- Actualizar la cuenta de origen.
UPDATE cuenta SET saldo = saldo - 200 WHERE usuario = 'USUARIO-A';
-- Actualizar la cuenta de destino.
UPDATE cuenta SET saldo = saldo + 200 WHERE usuario = 'USUARIO-B';
-- Verificar que se haya actualizado la cuenta de origen.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-A';
-- Verificar que se haya modificado la cuenta de destino.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-B';
-- Deshaga la transacción que realiza el usuario A al usuario usuario B.
ROLLBACK;


-- Transfiera 150 TLV Coins desde un usuario B un usuario C.
BEGIN TRANSACTION;
-- Verificar que la cuenta tenga saldo suficiente.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-B' AND saldo >= 150;
-- Verificar que la cuenta de destino exista.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-C';
-- Actualizar la cuenta de origen.
UPDATE cuenta SET saldo = saldo - 150 WHERE usuario = 'USUARIO-B';
-- Actualizar la cuenta de destino.
UPDATE cuenta SET saldo = saldo + 150 WHERE usuario = 'USUARIO-C';
-- Verificar que se haya actualizado la cuenta de origen.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-B';
-- Verificar que se haya modificado la cuenta de destino.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-B';
-- Deshaga la transacción que realiza el usuario B al usuario usuario C.
ROLLBACK;


-- Transfiera 500 TLV Coins desde un usuario C un usuario D.
BEGIN TRANSACTION;
-- Verificar que la cuenta tenga saldo suficiente.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-C' AND saldo >= 500;
-- Verificar que la cuenta de destino exista.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-D';
-- Actualizar la cuenta de origen.
UPDATE cuenta SET saldo = saldo - 500 WHERE usuario = 'USUARIO-C';
-- Actualizar la cuenta de destino.
UPDATE cuenta SET saldo = saldo + 500 WHERE usuario = 'USUARIO-D';
-- Verificar que se haya actualizado la cuenta de origen.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-C';
-- Verificar que se haya modificado la cuenta de destino.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-D';
-- Realice un commit de la transacción que realiza el usuario C al usuario usuario D.
COMMIT;


-- Transfiera 200 TLV Coins desde un usuario D un usuario A.
BEGIN TRANSACTION;
-- Verificar que la cuenta tenga saldo suficiente.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-D' AND saldo >= 200;
-- Verificar que la cuenta de destino exista.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-A';
-- Actualizar la cuenta de origen.
UPDATE cuenta SET saldo = saldo - 200 WHERE usuario = 'USUARIO-D';
-- Actualizar la cuenta de destino.
UPDATE cuenta SET saldo = saldo + 200 WHERE usuario = 'USUARIO-A';
-- Verificar que se haya actualizado la cuenta de origen.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-D';
-- Verificar que se haya modificado la cuenta de destino.
SELECT saldo FROM cuenta WHERE usuario = 'USUARIO-A';
-- Realice un commit de la transacción que realiza el usuario D al usuario usuario A.
COMMIT;
