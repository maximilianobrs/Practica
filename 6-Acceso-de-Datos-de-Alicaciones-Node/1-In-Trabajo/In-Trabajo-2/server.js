import express from 'express';
import bodyParser from 'body-parser';
import { nuevoUsuario, obtenerUsuarios } from './db/consultas.js'

const port = 3000;
const app = express();

// Meddleware
app.use(bodyParser.json());

//Obtener los datos de los usuarios con la ruta 'GET: /usuarios'
app.get('/usuarios', async (req, res) => {
        try {
                const usuarios = await obtenerUsuarios();
                console.log(usuarios);
                res.send(usuarios);
        } catch (error) {
                console.log(error);
                res.status(500).send('Error al obtener los usuarios');
        }
});

//Agregar usuario con la ruta 'POST: /usuarios'
app.post('/usuarios', async (req, res) => {
        try {
                const usuario = req.body;
                await nuevoUsuario(usuario);
                console.log(usuario);
                res.send(usuario);  
        } catch (error) {
                console.log(error);
                res.status(500).send('Error al agregar usuario');
        }
});


app.listen(port, () => console.log(`Servidor listo arriba en el puerto ${port}`));
