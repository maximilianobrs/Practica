//Contruyendo la aplicación que use el paquete Yargs para la definición de una interfaz de línea de comandos.
//Importando en una constante el paquete Yargs.
const yargs = require("yargs");

const argv = yargs
    //Inicializado el método “command” para el paso de parámetros.
    .command(
        //Definiendo el primer parametro.
        "saludo",
        //Definiendo el segundo parametro descripcion de saludo.
        "Saludando al usuario",
        //Definiendo el objeto.
        {
            //Declarando que se esperará recibir un argumento llamado “nombre”.
            nombre: {
                //Definiendo la descripción de este argumento.
                describe: "Nombre",
                //Declarando que este argumento es requerido con un true en la propiedad “demand”.
                demand: true,
                //Declarando el alias del argumento nombre, el cual será “n”.
                alias: "n",
            },
        },
        //Creando la funcion callback la cual recibe como parametro el objeto args.
        (args) => {
            console.log(`Hola ${args.nombre}, ten muy buenos días`);
        }
    )
    //Concatenando el método command con el método “help” y la propiedad argv
    .help().argv;