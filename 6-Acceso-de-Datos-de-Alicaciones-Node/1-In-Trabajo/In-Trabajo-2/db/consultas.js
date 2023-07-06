import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool(
    {
        user: "postgres",
        host: "localhost",
        password: process.env.PASSWORD,
        database: "postgres",
        port: 5432
    }
)

const obtenerUsuarios = () => {

}
const nuevoUsuario = (usuario) => {

}