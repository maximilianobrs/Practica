import express from "express";
import saludoRoutes from "../routes/quienSoyRoutes.js"

class Server {
    constructor() {
        this.app = express();
        this.port =3000;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use("/api/v1/", saludoRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

export default Server;