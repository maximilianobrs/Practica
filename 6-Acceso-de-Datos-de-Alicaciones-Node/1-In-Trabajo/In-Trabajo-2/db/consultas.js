import pg from 'pg';
const { Pool } = pg;

//Configuracion para la conexión a la base de datos
const pool = new Pool(
    {
        user: "postgres",
        host: "localhost",
        password: "postgres",
        database: "postgres",
        port: 5432
    }
)


//Arrow function para obtener usuarios
export const obtenerUsuarios = async() => {
        const resultado = await pool.query('SELECT * FROM usuarios')
        return resultado.rows
}
//Arrow function para agregar usuario
export const nuevoUsuario = async(usuario) => {
    const values = Object.values(usuario)
    const consulta = {
        text: 'INSERT INTO usuarios (nombre) VALUES ($1)',
        values
    }
    const result = await pool.query(consulta)
    return result
}
