import pg from 'pg';
const { Pool } = pg;

const pool = new Pool(
    {
        user: "postgres",
        host: "localhost",
        password: "postgres",
        database: "postgres",
        port: 5432
    }
)

export const nuevoUsuario = async(usuario) => {
        const values = Object.values(usuario)
        const consulta = {
            text: 'INSERT INTO usuarios (nombre) VALUES ($1)',
            values
        }
        const result = await pool.query(consulta)
        return result
}

export const obtenerUsuarios = async() => {
        const resultado = await pool.query('SELECT * FROM usuarios')
        return resultado.rows
}
