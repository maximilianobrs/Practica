import pg from 'pg';
const {Pool} = pg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

pool.connect(async( error_conexion , client , release ) =>{
    if(!error_conexion){
        try {
            await client.query("BEGIN");
            const descontar = " UPDATE usuarios SET saldo = saldo - 5000 WHERE email = 'example@gmail.cl' ";
            await client.query(descontar);
            const acreditar = " UPDATE usuarios SET saldo = saldo + 5000 WHERE email = 'example2@gmail.cl' ";
            await client.query(acreditar);
            await client.query("COMMIT");
        } catch (error) {
            console.log(`Error code: ${e.code}`);
            console.log(`Detalle error: ${e.DETAIL}`);
            console.log(`Tabla originaria error: ${e.TABLE}`);
            console.log(`Restriccion violada en el campo: ${e.constraint}`);
            await client.query("ROLLBACK")
        }
    }else{
        console.log(`salida conexion error: ${error_conexion}`);
    }
});