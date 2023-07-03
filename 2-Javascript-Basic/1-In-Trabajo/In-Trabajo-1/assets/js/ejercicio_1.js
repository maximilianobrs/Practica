
//VARIABLE NUM1 INGRESO DEl PRIMER NUMERO
let num1 = parseInt(prompt("Ingrese el primer número:"));
let num2 = parseInt(prompt("Ingrese el segundo número:"));

//VALIDACION QUE DEBE SER UN NUMERO Y NUMERO 1 Y NUMERO 2 QUE SEA MAYOR O IGUAL A 0
while (isNaN(num1) || num1 <= 0 || isNaN(num2) || num2 <= 0) {
    console.log('entrada al while')
    if (isNaN(num1) || num1 <= 0) {
        console.log('entrada al validacion num1')
        num1 = parseInt(prompt("Debes ingresar un número válido y mayor a cero para el primer número:"));
    }
    if (isNaN(num2) || num2 <= 0) {
        console.log('entrada al validacion num2')
        num2 = parseInt(prompt("Debes ingresar un número válido y mayor a cero para el segundo número:"));
    }
}
console.log('salida al while')
//DECLARACION DE LA FUNCION
function operaciones(num1, num2) {
    console.log('entrada a la funcion')
    //NUMEROS INGRESADOS POR EL USUARIO
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    //SE REALIZAN LAS OPERACIONES DE SUMA RESTA MULTIPLICAION Y DIVISION
    let suma = num1 + num2;
    let resta = num1 - num2;
    let multiplicacion = num1 * num2;
    let division = num1 / num2;

    //MUESTRA LOS RESULTADOS DE ;LAS OPERACIONES
    alert(`Los resultados de las operatorias son:
    La suma de los números es: ${suma}
    La resta de los números es: ${resta}
    La multiplicación de los números es: ${multiplicacion}
    La división de los números es: ${division}`) //SALIDA 
}

//LLAMMADA A LA FUNCION
operaciones(num1, num2);