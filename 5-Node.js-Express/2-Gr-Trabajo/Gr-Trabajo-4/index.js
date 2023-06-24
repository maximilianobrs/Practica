//importancion de metodos y funciones necesarias.
import express from 'express';
import { create } from 'express-handlebars';
import * as path from "path";
import { fileURLToPath } from 'url';
import * as helpers from "./lib/helpers.js";
import Jimp from 'jimp';
import fs from 'fs';

// Creando la instancia de la app express() y definiendo el port 3000
const app = express();
const port = 3000;

// Creacion de variable de entorno
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuracion de Meedlewares para el manejo de archivos estáticos y rutas
app.use(express.json());
app.use(express.static('public'));
app.use('/img', express.static(`${__dirname}/img`))
app.use('/css', express.static(`${__dirname}/public/assets/css`));
app.use('/img', express.static(`${__dirname}/public/assets/img`));
app.use('/js', express.static(`${__dirname}/public/assets/js`));
app.use('/axios',express.static(  `${__dirname}/node_modules/axios/dist`));


//Creando una instancia del motor de plantillas 'handlebars'
const hbs = create({
	// Integración de helper.
	helpers,
	// Utilizar varios directorios o parciales.
	partialsDir: [
		"views/partials/"
	]
});

// Configura el motor de plantillas 'handlebars' para Express
app.engine("handlebars", hbs.engine);
// Establece el motor de plantillas 'handlebars' como el motor de vistas de Express
app.set("view engine", "handlebars");


// Maneja la solicitud GET de la ruta raíz ("/") del sitio web
app.get("/", (req, res) => {
	res.render("home", {
		layout: "main"
	});
});

// Maneja la solicitud POST de la ruta "/upload" para procesar la imagen
app.post("/upload",(req,res)=>{
	const { url } = req.body
	const name = "./img/newImg.png"

	Jimp.read(url,(err,imagen)=>{
		if(err){
			console.error(err);
      		return res.status(500).send('Error al procesar la imagen.');
		}

		imagen
			.resize(350,Jimp.AUTO)
			.greyscale()
			.quality(60)
			.writeAsync(name)
				.then(() => {
					fs.readFile(name,(err)=>{
						if (err) throw err;
						console.log(`La imágen newImg.png se ha subido correctamente!!`);
						res.redirect("/galeria");
					});
				}).catch((err) => {
					console.log(err);
					res.status(500).send('Error al procesar la imagen.');
				});
	})
})
// Maneja la solicitud GET de la ruta "/galeria".
app.get("/galeria",(req,res)=>{
	res.render("galeria", {
		layout: "main"
	});
});
// Maneja la solicitud GET de la ruta "/nosotros".
app.get("/nosotros",(req,res)=>{
	res.render("nosotros",{
		layout: "main"
	});
});

// Maneja la solicitud GET '404' página no encontrada.
app.use('*',(req, res) => {
    res.render("404", {
		layout: "main"
	});
});

// Inicio del servidor y escucha las solicitudes en el puerto definido.
app.listen(port, () => console.log(`servidor arriba en el puerto ${port}`));



