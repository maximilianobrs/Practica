import express from 'express';
import { create } from 'express-handlebars';
import * as path from "path";
import { fileURLToPath } from 'url';
import * as helpers from "./lib/helpers.js";
import Jimp from 'jimp';
import fs from 'fs';

const app = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static('public'));
app.use('/img', express.static(`${__dirname}/img`))
app.use('/css', express.static(`${__dirname}/public/assets/css`));
app.use('/img', express.static(`${__dirname}/public/assets/img`));
app.use('/js', express.static(`${__dirname}/public/assets/js`));
app.use('/axios',express.static(  `${__dirname}/node_modules/axios/dist`));

const hbs = create({
	helpers,
	partialsDir: [
		"views/partials/"
	]
});

app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");



app.get("/", (req, res) => {
	res.render("home", {
		layout: "main"
	});
});


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

app.get("/galeria",(req,res)=>{
	res.render("galeria", {
		layout: "main"
	});
});
app.get("/nosotros",(req,res)=>{
	res.render("nosotros",{
		layout: "main"
	});
});
app.use('*',(req, res) => {
    res.render("404", {
		layout: "main"
	});
});

app.listen(port, () => console.log(`servidor arriba en el puerto ${port}`));



