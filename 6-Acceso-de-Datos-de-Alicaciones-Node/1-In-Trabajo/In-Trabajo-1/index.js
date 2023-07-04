import pg from 'pg';
const { Client, Pool } = pg;

const obtenerDatabase = async() => {
    //Conexión por objeto
    const client = new Client({
        user:"postgres",
        host:"localhost",
        database:"jeans",
        password:"7948",
        port:5432
    });

    //Conexión por string de conexión
    // connectionString:'postgresql://postgres:7948@localhost:5432/jeans'

    //Conexión
    await client.connect();
    //Query a la base de datos.
    const res = await client.query("SELECT NOW()");

    const result = res.rows
    await client.end();

    return result
}

obtenerDatabase()
    .then((respuesta)=>{
         console.log('Salida de respuesta-->', respuesta )
    })
    .catch((e)=> console.log(e))