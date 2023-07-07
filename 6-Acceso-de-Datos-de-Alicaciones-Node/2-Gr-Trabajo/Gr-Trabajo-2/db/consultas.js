import pg from 'pg';
const { Pool } = pg;
const pool = new Pool(
    {
        user: "escuela",
        host: "localhost",
        password: "escuela",
        database: "escuela",
        port: 5432,
        connectionTimeoutMillis: 2000,
        idleTimeoutMillis: 5000,
        max: 20,
    }
)
export const nuevaEstudiante = async (estudiante) => {

    try {
        
        const values = Object.values(estudiante)
        const consulta = {
            text: 'INSERT INTO estudiante (nombre,rut, curso, nivel) VALUES ($1, $2, $3, $4)',
            values
        }
        const result = await pool.query(consulta)

        console.log("Estudiante agregado", result)
        return result
    } catch (error) {
        console.log(error)
        return null
    } finally {
         
    }
}

export const obtenerEstudiantes = async () => {
    try {
        
        const resultado = await pool.query('SELECT * FROM estudiante ORDER BY id DESC')

        console.log("Listado de todos los estudiantes", resultado.rows)
        return resultado.rows
    } catch (error) {

    } finally {
        pool.on('release', () => console.log('pool => conexiones liberadas'))
    }
}
export const obtenerEstudiante = async (id) => {
    try {
        
        const values = Object.values(id)
        console.log(values)
        const consulta = {
            text: 'SELECT * FROM estudiante WHERE id = $1',
            values
        }
        const resultado = await pool.query(consulta)
        console.log("Estudiante encontrado", resultado.rows)
        return resultado.rows
    } catch (error) {
        console.log(error)
        return null
    } finally { 
        pool.on('release', () => console.log('pool => conexiones liberadas'))
    }
}
export const obtenerEstudianteRut = async (rut) => {
    try {
        
        const values = [rut]
        console.log(values)
        const consulta = {
            text: 'SELECT * FROM estudiante WHERE rut = $1',
            values
        }
        const resultado = await pool.query(consulta)

        console.log("Estudiante encontrado", resultado.rows)
        return resultado.rows
    } catch (error) {
        console.log(error)
        return null
    } finally {
        pool.on('release', () => console.log('pool => conexiones liberadas'))
    }
}

export const editarEstudiante = async (estudiante) => {

    try {
        
        const values = Object.values(estudiante)
        const consulta = {
            text: 'UPDATE estudiante SET nombre = $2, rut = $3, curso = $4, nivel = $5 WHERE id = $1 RETURNING *',
            values
        }

        const result = await pool.query(consulta)

        console.log("Estudiante Actualizado", result)
        return result
    } catch (error) {
        console.log(error)
        return null
    } finally {
        pool.on('release', () => console.log('pool => conexiones liberadas'))
    }
}

export const eliminarEstudiante = async (id) => {
    try {
        
        const values = Object.values(id)
        const consulta = {
            text: 'DELETE FROM estudiante WHERE id = $1 RETURNING *',
            values
        }
        const result = await pool.query(consulta)

        console.log("Estudiante Eliminado", result)
        return result
    } catch (error) {
        console.log(error)
        return null
    } finally {
        pool.on('release', () => console.log('pool => conexiones liberadas'))
    }
}

