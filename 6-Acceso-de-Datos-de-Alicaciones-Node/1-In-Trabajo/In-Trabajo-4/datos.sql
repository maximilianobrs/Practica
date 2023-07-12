CREATE TABLE usuarios (
first_name varchar(100),
last_name varchar(100),
email varchar(100),
saldo DECIMAL CHECK (saldo >= 0)
);