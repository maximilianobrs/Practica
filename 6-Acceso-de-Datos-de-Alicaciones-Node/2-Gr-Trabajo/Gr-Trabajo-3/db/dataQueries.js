import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

//Configuracion para la conexión a la base de datos
const pool = new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    }
)

export let obtenerRegistro = async (usuario) => {
    try {
        let values = Object.values(usuario)
        let consulta = {
            text: 'SELECT * FROM usuarios WHERE email = $1 AND contrasenia = $2',
            values
        }
        const {rows} = await pool.query(consulta);
        return rows.length > 0;
    } catch (error) {
        console.log(error);
    }
}

export let agregarRegistro = async (registro) => {
    try {
        let values = Object.values(registro)
        let consulta = {
            text: 'INSERT INTO usuarios (email , contrasenia) VALUES ( $1, $2)',
            values
        }
        const results = await pool.query(consulta);
        return results
    } catch (error) {
        console.log(error);
    }
}
export const obtenerUsuarios = async() =>{
    const resultado = await pool.query('SELECT * FROM usuarios ORDER BY id DESC')
    return resultado.rows
}