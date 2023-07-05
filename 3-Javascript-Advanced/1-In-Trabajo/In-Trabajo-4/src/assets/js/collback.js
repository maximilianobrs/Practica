// IMPORTANDO LA DATA
import { data } from "./data";

// DEFINIENDO LAS VARIABLES A UTILIZAR DEL DOM
let buscar = document.querySelector('#buscar');
let inputtext = document.querySelector('#inputtext');

// CAPTANDO UN EVENTO SUBMIT EN EL FORM
buscar.addEventListener('submit', (e) => {
    e.preventDefault();
    const identificador = inputtext.value;
    respuestaCallback(identificador, imprimir);
});

// EXPORTANDO LA FUNCION ARROW QUE DENTRO TIENE UN CALLBACK
export const respuestaCallback = (identificador, callback) => {
    console.log("inicio del timeout")
    
    setTimeout(() => {
        console.log("inicio forof")
        
        for (const contenido of data) {
            console.log('dentro del forof')
            
            if(contenido.id == identificador){
                
                callback(contenido);
                break;
            } else {
                callback(false);
                break;
            }
        }
        console.log("final timeout")
    }, 3000);
};

// CREANDO UNA FUNCION ARROW DE IMPRIMIR EN EL DOM
const imprimir = (contenido) => {
    
    let error = document.querySelector('#error');
    let innerpokemon = document.querySelector('#innerpokemon');
    
    innerpokemon.innerHTML = "";

    
    if (contenido === false) {
        console.log('pokemon no encontrado');
        innerpokemon.innerHTML = '';
        error.innerHTML = 'pokemon no encontrado';
    } else {
        error.innerHTML = '';
        innerpokemon.innerHTML = `
        <div class="box-card">
            <div class="informacion">
                 <h2>ID: ${contenido.id}</h2>
            </div>
            <div  class="informacion">
                <h2>Nombre: ${contenido.name}</h2>
            </div>
            <div  class="informacion">
                <h2>Tipo:${contenido.types}</h2>
           </div>
        </div>
        `;
    }
};


