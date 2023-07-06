import pg from 'pg';
const { Pool } = pg;

import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool(
    {
        user: "postgres",
        host: "localhost",
        password: process.env.PASSWORD,
        database: "postgres",
        port: 5432
    }
)

// export const obtenerUsuarios = () => {

// }
export const nuevoUsuario = async(usuario) => {
    const values = Object.values(usuario);

    const consulta = {
        text:'INSERT INTO usuarios(nombre) VALUES ($1)',
        values
    }

    const result = await pool.query(consulta);
    return result;
}