import pg from 'pg';
const { Pool } = pg;
const pool = new Pool(
    {
        user: "escuela",
        host: "localhost",
        password: "escuela",
        database: "escuela",
        port: 5432
    }
)
export const nuevaEstudiante = async (tarea) => {

    const values = Object.values(tarea)
    const consulta = {
        text: 'INSERT INTO estudiante (nombre,rut, curso, nivel) VALUES ($1, $2, $3, $4)',
        values
    }
    const result = await pool.query(consulta)
    console.log("Estudiante agregado", result)
    return result
}

export const obtenerEstudiantes = async () => {
    const resultado = await pool.query('SELECT * FROM estudiante ORDER BY id DESC')
    console.log("Listado de todos los estudiantes", result.rows)
    return resultado.rows
}
export const obtenerEstudiante = async (id) => {
    const values = Object.values(id)
    const consulta = {
        text: 'SELECT * FROM estudiante WHERE id = $1',
        values
    }
    const resultado = await pool.query(consulta)
    console.log("Estudiante encontrado", result.rows)
    return resultado.rows
}

export const editarEstudiante = async (tarea) => {

    const values = Object.values(tarea)
    const consulta = {
        text: 'UPDATE estudiante SET nombre = $2, rut = $3, curso = $4, nivel = $5 WHERE id = $1 RETURNING *',
        values
    }

    const result = await pool.query(consulta)
    console.log("Estudiante Actualizado", result)
    return result
}

export const eliminarEstudiante = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM estudiante WHERE id = ${id} RETURNING *`)
        console.log("Estudiante Eliminado", result)
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}

