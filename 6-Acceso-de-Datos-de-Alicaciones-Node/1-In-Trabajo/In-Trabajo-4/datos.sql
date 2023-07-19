CREATE TABLE usuarios (
  first_name varchar(100),
  last_name varchar(100),
  email varchar(100),
  saldo DECIMAL CHECK (saldo >= 0)
);

INSERT INTO usuarios (first_name, last_name, email, saldo)
VALUES ('esteban', 'dalas', 'example@gmail.cl', 20000),
       ('alex', 'alfram', 'example2@gmail.cl', 20000);