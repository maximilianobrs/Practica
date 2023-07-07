import express from 'express';
import bodyParser from 'body-parser';
import { nuevoUsuario, obtenerUsuarios, editarUsuario ,eliminarUsuario } from '../db/consultas.js'


const app = express();
const port = 3000;

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
})

//Agregar usuario con la ruta 'POST: /usuarios'
app.post('/usuarios', async (req, res) => {
        try {
                const usuario = req.body;
                await nuevoUsuario(usuario);
                console.log('Usuario agregado=====>',usuario);
                res.send('Usuario agregado');  
        } catch (error) {
                console.log(error);
                res.status(500).send('Error al agregar usuario');
        }
})

//Editar usuario con la ruta 'PUT: /usuarios'
app.put('/usuarios', async (req, res) =>{
        try {
                const editUsuario = req.body;
                await editarUsuario(editUsuario);
                console.log('Usuario editado====>',editUsuario);
                res.send('Usuario editado');
        } catch (error) {
                console.log(error);
                res.status(500).send('Error al editar asuario')
        }
})

//Eliminar usuario con la ruta 'DELETE: /usuarios/:id'
app.delete('/usuarios/:id', async (req, res) =>{
        try {
                const id = req.params;
                const response = await eliminarUsuario(id);
                console.log('Usuario eliminado===>',response);
                res.send('Usuario eliminado');
        } catch (error) {
                console.log(error);
                res.status(500).send('Error al eliminar asuario')
        }
})

app.listen(port, () => console.log(`Servidor listo arriba en el puerto ${port}`));
