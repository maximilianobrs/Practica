import express from 'express';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from 'path';
import { obtenerRegistro, agregarRegistro } from './db/dataQueries.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

const port = 7000;

app.use('/axios',express.static(`${__dirname}/node_modules/axios/dist`))
app.use('/js', express.static(`${__dirname}/public/assets/js`));
app.use('/css', express.static(`${__dirname}/public/assets/css`));
app.use('/img', express.static(`${__dirname}/public/assets/img`));

//Configuracion handlebars.
const hbs = create({ extname: '.hbs', });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/home', (req, res) => {
  res.render('home');
});


app.post('/login', async (req, res) => {
  try {
    const usuario = req.body;
    const registro = await obtenerRegistro(usuario);
    
    if (registro) {
      res.status(200)
        .json({message: 'Exito al iniciar sesion' })
        .end();
    } else{
      res.status(404)
        .json({message: 'No encontrado' })
        .end();
    }

  } catch (error) {
    console.log(error);
    res.status(500)
      .json({message: 'Se a producido un error'})
      .end();
  }
});

app.post('/usuario', async (req, res) => {
  try {
    const registro = req.body;
    await agregarRegistro(registro);
    res.status(201)
      .json({ result: true, message: 'Exito usuario registrado' })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500)
      .json([{ message: 'Se a producido un error' }])
      .end();
  }
});

app.get('usuarios',async(req,res)=>{
  const usuarios = await obtenerUsuarios();
  res.send(usuarios)
})

app.listen(port, () => console.log(`Servidor listo en el puerto ${port}`));



