import express from 'express';
import bodyParser from 'body-parser';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from 'path';
import {obtenerRegistro,agregarRegistro} from './db/dataQueries.js'


const app = express();
const port = 7000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use('/js', express.static(`${__dirname}/public/assets/js`))

//Configuracion handlebars.
const hbs = create({extname: '.hbs',});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/registro',async(req,res)=>{
  try {
      const usuario = req.body;
      const registro = await obtenerRegistro(usuario);
      console.log(registro);
      res.send(registro);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener el registro');
  }
})
app.post('/registro',async(req,res)=>{
  try {
    const registro = req.body;
    await agregarRegistro(registro);
    console.log(registro);
    res.send('Registro agregado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al hacer el registro');
  }
})

app.listen(port, () => console.log(`Servidor listo en el puerto ${port}`));



