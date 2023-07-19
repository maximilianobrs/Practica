import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

pool.connect(async (error_conexion, client, release) => {
  if (!error_conexion) {
    try {
      await client.query('BEGIN');

      const obtenerSaldoUsuario1 = "SELECT saldo FROM usuarios WHERE email = 'example@gmail.cl'";
      const resultadoSaldoUsuario1 = await client.query(obtenerSaldoUsuario1);

      const saldoUsuario1 = resultadoSaldoUsuario1.rows[0]?.saldo;

      if (saldoUsuario1 < 5000) {
        throw new Error("Usuario 1 con saldo insuficiente para realizar la transferencia.");
      }

      const descontar = "UPDATE usuarios SET saldo = saldo - 5000 WHERE email = 'example@gmail.cl'";
      await client.query(descontar);

      const acreditar = "UPDATE usuarios SET saldo = saldo + 5000 WHERE email = 'example2@gmail.cl'";
      await client.query(acreditar);

      const obtenerSaldoUsuario2 = "SELECT saldo FROM usuarios WHERE email = 'example2@gmail.cl'";
      const resultadoSaldoUsuario2 = await client.query(obtenerSaldoUsuario2);

      const saldoUsuario2 = resultadoSaldoUsuario2.rows[0]?.saldo;

      console.log("Descuento realizado con éxito. Nuevo saldo de esteban:", saldoUsuario1);
      console.log("Acreditación realizada con éxito. Nuevo saldo de alex:", saldoUsuario2);

      await client.query("COMMIT");
    } catch (error) {
        console.error("Error durante la transacción:", error.message);
        console.log("Error code:", error.code);
        console.log("Detalle error:", error.detail);
        console.log("Tabla originaria error:", error.table);
        console.log("Restriccion violada en el campo:", error.constraint);
      await client.query("ROLLBACK");
    } finally {
      release();
      pool.end();
    }
  } else {
    console.error("Error de conexión:", error_conexion);
  }
});

