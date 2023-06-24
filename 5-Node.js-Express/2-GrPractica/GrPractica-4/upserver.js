import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import {exec} from 'child_process';


const key = '123';

// node index.js login -k=123
const argv = yargs(hideBin(process.argv))
    .command(
        // EL nombre del comando
        "login",
        // Descripción del comando a definir
        "Comando para acceder al banco",
        {
            key:{
                describe:'Contraseña',
                demand  :true,
                alias   : "k"
            }
        },
        ( args ) =>{
            const serverComand = "node index.js"
            // Usamos un condicional
            if(args.key == key){
               const serverProcess = exec(serverComand)
               serverProcess.stdout.on('data', (data) => {
                console.log(`Salida del servidor: ${data}`);
              });
              serverProcess.stderr.on('data', (data) => {
                console.error(`Error del servidor: ${data}`);
              });
              serverProcess.on('close', (code) => {
                console.log(`El servidor ha sido detenido con el código de salida ${code}`);
              });
            }else{
                console.log("Credenciales incorrectas")
            }        
        }
    )
    .help().argv