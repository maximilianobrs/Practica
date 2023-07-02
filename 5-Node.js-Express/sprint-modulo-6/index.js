import axios from 'axios';
import express from 'express';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de express
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta pública
app.use(express.static('public'));

// Carpeta de módulos
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist'));
app.use('/db', express.static(__dirname + '/db'));
app.use('/swal', express.static(__dirname + '/node_modules/sweetalert2/dist'));

// Configuración de handlebars
const hbs = create({
	extname: '.hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Rutas
app.get('/', async (req, res) => {
	try {
		// Obtener roommates
		const roommates = await axios.get('http://localhost:3000/roommate');
		const arrRoommates = await roommates.data;

		// Obtener gastos
		const gastos = await axios.get('http://localhost:3000/gastos');
		const arrGastos = await gastos.data.map((gasto) => {
			const roommate = arrRoommates.find(
				(roommate) => roommate.id === gasto.roommate_id
			);

			return { ...gasto, roommate };
		});

		// Devuelve los datos a la vista
		return res.render('index', {
			title: 'Home',
			roommates: arrRoommates,
			gastos: arrGastos,
		});
	} catch (err) {
		console.log(err);

		// Devuelve un error 404 en caso de que no se encuentre el archivo
		return res.status(404).location('/').end();
	}
});

app.get('/roommate', (req, res) => {
	try {
		const roommates = fs.readFileSync('./db/roommates.json', 'utf-8');
		const arrRoommates = JSON.parse(roommates);

		return res.status(200).json(arrRoommates);
	} catch (err) {
		console.log(err);

		return res.status(404).end();
	}
});

app.post('/roommate', async (req, res) => {
	try {
		// Conseguir datos de random user
		const data = await axios.get('https://randomuser.me/api/');
		const user = await data.data.results[0];

		// Crear roommate
		const roommate = {
			id: uuid(),
			nombre: `${user.name.first} ${user.name.last}`,
			debe: 0,
			recibe: 0,
		};

		// Obtener a todos los roommates
		const roommates = fs.readFileSync('./db/roommates.json', 'utf-8');
		const arrRoommates = JSON.parse(roommates);

		// Agregar roommate
		arrRoommates.push(roommate);

		// Almacenar roommate
		fs.writeFileSync('./db/roommates.json', JSON.stringify(arrRoommates));

		// Recargar página
		return res.status(201).json(arrRoommates).end();
	} catch (err) {
		console.log(err);

		return res.status(404).location('/').end();
	}
});

app.get('/gastos', (req, res) => {
	try {
		const gastos = fs.readFileSync('./db/gastos.json', 'utf-8');
		const arrGastos = JSON.parse(gastos);

		return res.status(200).json(arrGastos);
	} catch (err) {
		console.log(err);

		return res.status(404).location('/').end();
	}
});

app.post('/gasto', (req, res) => {
	try {
		const { roommate_id, descripcion, monto } = req.body;

		if (!roommate_id || !descripcion || !monto) return res.status(400).end();

		const gasto = {
			id: uuid(),
			roommate_id,
			descripcion,
			monto,
		};

		const gastos = fs.readFileSync('./db/gastos.json', 'utf-8');
		const arrGastos = JSON.parse(gastos);

		arrGastos.push(gasto);

		fs.writeFileSync('./db/gastos.json', JSON.stringify(arrGastos));

		return res.status(201).json(arrGastos).end();
	} catch (err) {
		console.log(err);

		return res.status(404).location('/').end();
	}
});

app.put('/gasto', (req, res) => {
	try {
		// Recibir ID y datos
		const { id, roommate_id, descripcion, monto } = req.body;

		console.log(req.body);

		// Validar datos
		if (!id || !roommate_id || !descripcion || !monto)
			return res.status(400).end();

		// Obtener gastos
		const gastos = fs.readFileSync('./db/gastos.json', 'utf-8');
		const arrGastos = JSON.parse(gastos);

		// Buscar gasto
		const index = arrGastos.findIndex((gasto) => gasto.id === id);

		// Validar que exista
		if (index === -1) return res.status(404).end();

		// Editar gasto
		arrGastos[index] = {
			id,
			roommate_id,
			descripcion,
			monto,
		};

		// Guardar gastos
		fs.writeFileSync('./db/gastos.json', JSON.stringify(arrGastos));

		// Devolver gastos
		return res.status(200).json(arrGastos).end();
	} catch (err) {
		console.log(err);

		return res.status(404).location('/').end();
	}
});

app.delete('/gasto', (req, res) => {
	try {
		const { id } = req.body;

		if (!id) return res.status(400).end();

		const gastos = fs.readFileSync('./db/gastos.json', 'utf-8');
		const arrGastos = JSON.parse(gastos);

		const index = arrGastos.findIndex((gasto) => gasto.id === id);

		if (index === -1) return res.status(404).end();

		arrGastos.splice(index, 1);

		fs.writeFileSync('./db/gastos.json', JSON.stringify(arrGastos));

		return res.status(200).json(arrGastos).end();
	} catch (err) {
		console.log(err);

		return res.status(404).location('/').end();
	}
});

// Servidor
app.listen(3000, () => {
	console.log('Server running on port 3000');
});
