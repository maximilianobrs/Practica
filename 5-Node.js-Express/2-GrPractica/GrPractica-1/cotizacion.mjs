//Importado los modulos https y fs.
import https from 'https';
import fs from 'fs';

// Opteniendo los valores de process.argv, que fueron pasasdos como argumentos.
const des = process.argv.splice(2);
const [nombreArchivo,extension,money,cambio] = des;
const pesos = parseInt(money);

// Obteniendo las fechas actuales
const fechasDelAnio = new Date();
const dias = fechasDelAnio.getDate();
const mes = fechasDelAnio.getMonth();
const year = fechasDelAnio.getFullYear();

// Realizando una solicitud al servidor https con método get y obtener la respuesta.
https
    .get(`https://mindicador.cl/api/${cambio}/${dias}-${mes}-${year}`, (resp) => {

        let data = "";
        
        // Capturando las respuestas de la data en trozos de datos, y acumulándolos en la variable data.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // Finalizando la respuesta con el evento end.
        resp.on('end', () => {

            const res = JSON.parse(data);
            const valor = res.serie[0].valor
            
            let division = pesos / valor;
            let resultadoCambio = division.toFixed(2);

            let mensaje = `A la fecha: ${fechasDelAnio} 
            Fue realizada cotización con los siguientes datos: 
            Cantidad de pesos a convertir: ${pesos} pesos 
            Convertido a ${res.codigo} da un total de: ${resultadoCambio} ${res.codigo}`

            //Creando el archivo.txt con el contenido de mensaje con el metodo writeFile y leyendolo con con readFile.
            fs.writeFileSync(`${nombreArchivo}.${extension}`,mensaje,'utf8')
            fs.readFile(`${nombreArchivo}.${extension}`,'utf8', (err, data) => {
                if (err) throw err;
                console.log(data);
            });

        });
    })

    // Manejando el error en caso de fallar la solicitud o respuesta.
    .on('error', (err) => {
        console.log('Error en la solicitud: ' + err.message)
    });

