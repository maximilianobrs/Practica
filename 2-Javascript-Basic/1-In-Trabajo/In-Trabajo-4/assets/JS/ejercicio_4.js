

// 1. Cree una función que reciba como parámetros dos números enteros y retorne otro entero
// que sea el primer número elevado al segundo.


const primera = (numero1, numero2) => {
    console.log(numero1, numero2)
    return Math.pow(numero1, numero2); // eleva el segundo valor
    // return numero1 ** numero2 // misma formula elevando el valor dos
}
//dandole dandole los dos valores a la funcion 
let resultado = primera(5, 2);

console.log(resultado)


// 2. Cree una función que reciba como parámetro un número entero menor que 20 y retorne el
// factorial del número. ej 5! = 1*2*3*4*5

const factorial = (numero)=> {
    if(isNaN(numero)){
        return 'no es un numero'
    }
    else if (numero < 0 || numero > 20) { //validando que numero sea mayor y menor que 20
        return "el numero debe ser menor o igual a 20.";
    } else if (numero === 0 || numero === 1) { //valindando los primeros dos valores retornen 1
        return 1;
    } else {
        let resultado = 1;
        for (let i = 1; i <= numero; i++) {
            console.log(i)
            resultado *= i; //multiplicando el valor i por el valor de resultado
            console.log(resultado)
        }
        return resultado;
    }
}
//dandole el valor a la funcion
let resultado2 = factorial(5);
console.log(resultado2)

// 3. Cree un programa que defina un objeto usuario que tenga propiedades nombre y edad y
// dos funciones que permitan modificar el nombre y la edad de manera independiente.


class Usuario {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    cambiarEdad(nuevaEdad) {
        this.edad = nuevaEdad;
    }

    cambiarNombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }
}

//dandole los valores a las funciones
let usuario1 = new Usuario('pedro', 99)
let usuario2 = new Usuario('juan', 66)

console.log(usuario1)
console.log(usuario2)

usuario1.cambiarEdad(30)
usuario2.cambiarNombre("rober");

console.log(usuario1)
console.log(usuario2)



// 4. cree una función que calcule el factorial de un número entero menor que 20 utilizando esta
// vez la notación de flecha.


const factorialArrow = (numero) => { // definiendo una funcion flecha o arrow funtion para calcualar resultado factorial
    if(isNaN(numero)){
        return 'no es un numero'
    }
    else if (numero < 0 || numero > 20) {
        return "el numero debe ser menor o igual a 20.";
    } else if (numero === 0 || numero === 1) {
        return 1;
    } else {
        let resultado = 1;
        for (let i = 1; i <= numero; i++) {
            console.log(i)
            resultado *= i;
            console.log(resultado)
        }
        return resultado;
    }
}
let resultado7 = factorialArrow(3);
console.log(resultado7)





// 5. cree una función que permita calcularla serie de fibonacci hasta un número entero menor
// que 20, en la serie cada número está dado por la suma de los dos anteriores.



const fibonacci = (numero) =>{ // funcion flecha para calcular la serie de fitbanacci
    
    if(isNaN(numero)){
        return 'no es un numero'
    }
    else if (numero < 0 || numero > 20) {
        return "El número debe ser menor o igual a 20.";
    } else if (numero === 0 || numero === 1) {
        return 1;
    } else {
        let resultado = [1, 1];
        for (let i = 2; i <= numero; i++) {
            console.log(i)
            resultado[i] = resultado[i - 1] + resultado[i - 2];
        }
        return resultado;
    }
}
//entregando un valor a la funcion
let resultado5 = fibonacci(8);
console.log(resultado5);


// 6. cree una función que le permita determinar si una palabra es palíndroma o no, un
// palíndromo es una palabra que se escribe de igual manera de izquierda a derecha que de
// derecha a izquierda, por ejemplo “somos”


const palabraPalindroma = (palabra) => {
    return palabra === palabra.split('').reverse().join(''); //comparacion de palabras original con su reverso que da como true o false
}

console.log(palabraPalindroma("somos"));
console.log(palabraPalindroma("casa"));

