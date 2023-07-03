/**
 *  1.- Construya una función que dado un número n entero y menor que 100 calcule la sumatoria de 1 hasta n.
 */
const sumatoriaHastaN = (n)=>{
  if(isNaN(n) || n>100 || n<0){
    console.log('Número ni es válido o mayor a 100\nDebe ingresar un número entre 1 y 100');
    return;
  }

  let acumulador=0;
  let inicio=1
  let fin=n
  for (let i = inicio; i <= fin; i++) {
    acumulador += i;
  }
  console.log(`La sumatoria hasta el número ${n} es igual a ${acumulador}`)
  return acumulador
} 
 
/*
2.- Construya una función que imprima si un número es primo o no, los números primos son aquellos que son divisibles solo por 1 y por sí mismos.
*/
const esPrimo = (numero)=> {
  let result = ''
  if (numero <= 3) result = true;
  if (numero % 2 == 0 || numero % 3 == 0) result = false;
  for (let i = 2; i < numero; i++) {
    if (numero % i == 0) result = false;
  }
  if (result) {
    console.log(`El número ${numero} es Primo`)
  } else {
    console.log(`El número ${numero} no es Primo`)
  }
  return true;
}
/**
 * 3.- Cree una función que dado un número n entero y menor que 100 imprima la cuenta regresives decir si n es 5 deberá imprimir 5,4,3,2,1
 */

const cuentaRegresiva = (valorEntero) => {

  if (isNaN(valorEntero) || typeof valorEntero != 'number' || valorEntero < 0 || valorEntero > 100) {
    let mensaje = ''
    console.log('paso')
    //alert(mensaje)
    if (typeof valorEntero != 'number' || isNaN(valorEntero)) {
      mensaje = `El valor ${valorEntero} ingresado es un tipo de dato ${typeof valorEntero}, por lo que no es un número válido`
    }
    else if (valorEntero < 0) {
      mensaje = `El valor ${valorEntero} ingresado debe ser mayor o igual a 0`
    }
    else if (valorEntero > 100) {
      mensaje = `El valor ${valorEntero} ingresado debe ser menor o igual a 100`
    }
    console.log(mensaje)
  } else {
    for (let numero = valorEntero; numero > -1; numero--) {
      console.log(numero)
    }
  }
}

/**
4.- Construya una función que dado un numero n entero mayor que 10 y menor que 1000 calcule la sumatoria de todos los números pares contenidos en el rango.
 */
const sumatoria = (inicio, final) => {
  let sum = 0;
  while (inicio <= final) {
    if (inicio % 2 == 0) {
      sum += inicio;
    }
    inicio++;
  }
  console.log(sum);
  return sum;
}
sumatoria(10, 100);
console.log(`La suma de pares en el intervalo (10, 1000) es: ${sumatoria}`)


/**
5.- Cree una función que permite dado un numero n imprima la tabla de multiplicar de dicho numero hasta el 12
 */
const tabla = (numero)=> {
  for (let i = 1; i <= 12; i++) {
    console.log(`${numero} x ${i} = ${numero * i}`);
  }
}