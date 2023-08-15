import express from "express";
import routerUser from "./routes/user.routes.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/users',routerUser);


app.listen(port, ()=> console.log(`Servidor arriba en el puerto ${port}`))