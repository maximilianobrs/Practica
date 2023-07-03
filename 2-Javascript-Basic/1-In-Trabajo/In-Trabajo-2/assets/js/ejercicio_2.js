
//Declaracion de una arrow function llamada edadPersona
let edadPersona = () =>{

    //Pedimos la edad de la persona con un prompt
    let edad = parseInt(prompt('cuantos años tienes'));

    //Declaracion de un ciclo while verificando si no es un numero y que la edad sea mayor o igual a 0
    while (isNaN(edad) || edad <= 0 ){
        console.log('entrada del while')//entrada al while 
        edad = parseInt(prompt('Ingrese una edad valida')) // Que la persona ingrese una edad valida
    }
    console.log('fuera del while');

    if(edad < 18){ // Si la persona es menor a 18 años es menos de edad
        console.log('entrada a menor de edad');//entrada
        alert('Eres menor de edad');//salida

    }else if(edad < 65){// Si la persona esta entre 18 a 64 es adulta
        console.log('entrada a adulto');//entrada
        alert('Eres adulto');//salida

    }else if(edad < 85){// Si la persona esta entre 65 a 84 es adulto mayor
        console.log('entrada a adulto mayor');//entrada
        alert('Eres adulto mayor');//salida

    }else{// Si la persona ya es mayor o igual  a 85 esta en sus años dorados
        console.log('entrada a años dorados')//entrada
        alert('Estas en los años dorados')//salida
    }
}

edadPersona()//llamado a la funcion para ejecutarla

