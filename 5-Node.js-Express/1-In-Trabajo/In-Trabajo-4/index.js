import express from "express";
import { create } from "express-handlebars";
import * as path from "path";
import { fileURLToPath } from 'url';

const app = express();
const port = 4000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
//configuracion de las rutas staticas
app.use(express.json());
app.use(express.static('public'));
app.use('/css', express.static(`${__dirname}/public/assets/css`));

const hbs = create({
    partialsDir: [
        "views/partials/"
    ]
});

// Configura el motor de plantillas 'handlebars' para Express
app.engine("handlebars", hbs.engine);
// Establece el motor de plantillas 'handlebars' como el motor de vistas de Express
app.set("view engine", "handlebars");


//definiendo el array de objetos de ejemplo.
const tareas = [
    // {
    //     nombre: 'Completar informe mensual',
    //     descripcion: 'Crear y enviar el informe de ventas del mes.',
    //     fecha: '27/06/2023',
    //     prioridad: 'alta'
    // },
    // {
    //     nombre: 'Revisar correos electrónicos',
    //     descripcion: 'Responder a los correos importantes y archivar los demás.',
    //     fecha: '27/06/2023',
    //     prioridad: 'media'
    // },
    // {
    //     nombre: 'Comprar suministros de oficina',
    //     descripcion: 'Hacer una lista de los suministros necesarios y realizar la compra.',
    //     fecha: '27/06/2023',
    //     prioridad: 'baja'
    // }
];
//definiendo el metodo get para la ruta '/pendientes'.
app.get("/pendientes", (req, res) => {
    res.render('home', {
        layouts: "main",
        pendientes: tareas,
        title: "Hay tareas pendientes por hacer",
        title2: "No hay tareas pendientes por hacer"
    });
})
//levantando el servidor en el port correspondiente.
app.listen(port, () => console.log(`servidor arriba en el puerto ${port}`));