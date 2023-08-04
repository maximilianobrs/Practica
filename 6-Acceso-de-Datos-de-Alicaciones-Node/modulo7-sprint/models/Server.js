import express from 'express';
import db from '../db/connection.js';
import usuarioRoutes from '../routes/usuario.js';
import transferenciasRoutes from '../routes/transferencia.js';
import homeRoutes from '../routes/home.js';
import { create } from 'express-handlebars';

class Server {
	constructor(__dirname) {
		this.__dirname = __dirname;
		this.app = express();
		this.port = process.env.PORT || '8000';

		this.apiPaths = {
			usuarios: '/api/usuario',
			transferencias: '/api/transferencia',
			home: '/',
		};

		// Vamos a definir e iniciar nuestros metodos
		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	async dbConnection() {
		try {
			await db.sync();

			console.log('Database online');
		} catch (error) {
			throw new Error(error);
		}
	}

	middlewares() {
		const hbs = create({
			// Utilizar varios directorios o parciales.
			partialsDir: ['views/partials/'],
		});

		this.app.engine('handlebars', hbs.engine);
		this.app.set('view engine', 'handlebars');

		this.app.use(express.json());
		this.app.use(express.static(this.__dirname + '/public'));
		this.app.use(
			'/bootstrap',
			express.static(this.__dirname + '/node_modules/bootstrap/dist/css')
		);
		this.app.use(
			'/bootstrapJs',
			express.static(this.__dirname + '/node_modules/bootstrap/dist/js')
		);
		this.app.use(
			'/axios',
			express.static(`${this.__dirname}/node_modules/axios/dist`)
		);
	}

	routes() {
		this.app.use(this.apiPaths.usuarios, usuarioRoutes);
		this.app.use(this.apiPaths.transferencias, transferenciasRoutes);
		this.app.use(this.apiPaths.home, homeRoutes);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Servidor corriendo en el puerto ${this.port}`);
		});
	}
}

export default Server;
