import express from 'express';
import bodyParser from 'body-parser';
import { nuevoUsuario, obtenerUsuarios } from './db/consultas.js'

const port = 3000;

const app = express();

app.use(bodyParser.json());

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
