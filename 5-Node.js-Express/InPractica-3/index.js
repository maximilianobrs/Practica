// Importano el modulo y la funcion asincrona miRandomPoke
import express from "express";
import { miRandomPoke } from "./api.js";
const app = express();

//Definiendp la ruta /pokemon/random
app.get("/pokemon/random", (req, res) => {
    miRandomPoke()
        .then((data) => {
            res.json(data)
        }).catch((err) => {
            console.log(err);
        });
})
//Escunchando el servidor
app.listen(1000, () => {
    console.log("servidor arriba en el puerto 1000")
})