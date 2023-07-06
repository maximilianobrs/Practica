import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPant} from 'url';
import {dirname} from 'path';

const port = 3000;

const __filename = fileURLToPant(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(bodyParser.json());

app.get('/usuarios',async(req,res)=>{
    const usuarios = await obtenerUsuarios();
    res.send(usuarios);
});
app.post('/usuarios',async(req,res)=>{
        const usuario = req.body;
        await nuevoUsuario(usuario);
        res.send(usuario);
});


app.listen(port,()=> console.log(`Servidor listo arriba en el puerto ${port}`));
