import express  from "express";
import arrayRoutes from '../routes/arrayRoutes.js'

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;

        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use("/api/v1/", arrayRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor arriba en el puerto ${this.port}`);
        })
    }
}

export default Server;