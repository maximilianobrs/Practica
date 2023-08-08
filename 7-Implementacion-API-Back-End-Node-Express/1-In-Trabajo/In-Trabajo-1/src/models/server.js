//Importando modulos express,dotenv y las rutas.
import express from "express";
import dotenv from "dotenv";
import saludoRoutes from "../routes/quienSoyRoutes.js"

//confiuracion de .env.
dotenv.config();

//definiendo la clase Server.
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;

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

//Exportando la clase Server.
export default Server;