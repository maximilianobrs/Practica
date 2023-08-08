import express from 'express';
import imgRoutes from './routes/imagenes.routes.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`))
app.use('/css',express.static(`${__dirname}/public/assets/css`))
app.use(fileUpload({
    createParentPath:true,
    limits:{fileSize:3 * 1024 * 1024},
    abortOnLimit:true,
    responseOnLimit:"Archivo supera los 3MB"
}));

app.use("/", imgRoutes);

app.listen(port, () => console.log(`servidor arriba en el puerto ${port}`));