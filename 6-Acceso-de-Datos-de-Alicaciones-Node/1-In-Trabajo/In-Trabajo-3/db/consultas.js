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
        const resultado = await pool.query('SELECT * FROM usuarios ORDER BY id')
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
//Arrow function para editar usuario
export const editarUsuario = async(editUsuario) => {
    const values = Object.values(editUsuario)
    const consulta = {
        text: 'UPDATE usuarios SET nombre = $2 WHERE id = $1 RETURNING *',
        values
    }
    const result = await pool.query(consulta)
    return result
}
//Arrow function para eliminar usuario
export const eliminarUsuario = async(id) => {
    const values = Object.values(id)
    console.log(values);
    const consulta = {
        text: 'DELETE FROM usuarios WHERE id = $1 RETURNING *',
        values
    }
    const result = await pool.query(consulta)
    return result
}