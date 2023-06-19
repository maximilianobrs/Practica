//Importando modulos express y moment
import express from "express";
import moment from "moment";

const app = express();

moment.locale('es');//estableciendo el idioma.

app.get('/',(req,res)=>{
    
    //Creando moment con la fecha actual sumando 10 días y en el siguiente formato “dddd”
    const diesDias = moment().add(10,'days').format('dddd ');
    res.send(diesDias);
})
app.listen(3000,()=> console.log('server arriba en el puerto 3000'));
