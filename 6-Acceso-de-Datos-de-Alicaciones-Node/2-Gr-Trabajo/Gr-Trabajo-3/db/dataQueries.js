import pg from 'pg';

const { Pool } = pg;

//Configuracion para la conexión a la base de datos
const pool = new Pool(
    {
        user: "postgres",
        host: "localhost",
        password: "7948",
        database: "usuarios",
        port: 5432
    }
)

export let obtenerRegistro = async(usuario)=>{
    let values = Object.values(usuario)
    let consulta = {
        text:'SELECT * FROM registros WHERE email = $1, password = $2',
        values
    }
    const resuts = await pool.query(consulta);
    return resuts.rows
}

export let agregarRegistro = async(registro)=>{
    let values = Object.values(registro)
    let consulta = {
        text:'INSERT INTO (nombre,email,contrasenia) VALUES (1$,2$,3$)',
        values
    }
    const resuts = await pool.query(consulta);
    return resuts
}