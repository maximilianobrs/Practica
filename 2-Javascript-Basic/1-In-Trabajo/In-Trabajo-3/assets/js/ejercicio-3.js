// 1. Cree una funcion que dado un numero n cree un arreglo de largo n, donde en cada posicion
// del arreglo este el doble del anterior nota, el primer elemento del arreglo es 1



const ejercicio1 = (n) => {
    const miArray = [1]

    console.log(miArray)
    for (let i = 1; i < n; i++) {
        console.log(i) // entrada al ciclo 
        miArray.push(miArray[i - 1] * 2) // agregando el elemento del array y se multiplica * 2 para obtener el doble
    }

    console.log(`salida del resultado: ${miArray}`)
}

ejercicio1(10)//entregando el valor de 10 a la funcion


// 2. Cree una funcion que dado un arreglo de numeros de largo 10 permita obtener el mayor
// numero contenido en el arreglo

const miArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const obtenerMayor = (numeros) => {
    let mayor = numeros[0]

    for (let i = 0; i < numeros.length; i++) { // ciclo de 0 hasta la longitud del array 

        if (numeros[i] > mayor) { // validando que numero es mayor del array descartandolos entre si
            mayor = numeros[i]
            console.log(i)
        }
    }
    return mayor //retun del numero mayor
}
// dando entrega del numero mayor del array
console.log(obtenerMayor(miArray2))


// 3. Dado un arreglo de strings que contiene los dias de la semana, cree una funcion que le
// permita obtener un dia en particular si se recibe sunumero correspondiente.ej
// 1 = Lunes , 7 = Domingo.

//dias de la semana
const miArray3 = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo',]

const diasSemana = (num) => {
    dias = miArray3 //entregando los valores del array
    console.log(dias)
    return dias[num - 1] // devuelve el valor del array por el numero entregado que es 5 que se le resta 1 y da como resultado 4 que es viernes
}

console.log(diasSemana(5))

// 4. Cree una funcion que le permita buscar un elemento contenido en el arreglo. nota, el
// arreglo solo contendra numeros, y tendra un largo maximo de 100.

const busqueda = (array, elemento) => {

    for (let i = 0; i < array.length; i++) {
        console.log(i) //entrada al ciclo for

        if (array[i] === elemento) {
            console.log(array[i]) // entradando a la validacion del elemento buscado
            return array[i] //retornado el valor encontrado

        } else if (!array.includes(elemento)) { //validacion si no esta en el array
            console.log(`elemento ${elemento} no encontrado`)
            return `elemento ${elemento} no encuentrado`
        }
    }
}

const biblioteca = [2, 4, 6, 8, 10, 12, 14, 15]

//llamado a la funcion que busca el numero 8 en el array
console.log(busqueda(biblioteca, 8))

// 5. Cree un programa que dado un arreglo de numeros desordenados los ordene
// ascendentemente.

const ordenarNumeros = (arreglo) => {
    arreglo.sort((a, b) => a - b); // utilizando el metodo sort para ordenar el array cualla funcion dentro ordena el array de menor a mayor
    return arreglo; //devuelve el array ordenado
}

const miArray4 = [3, 2, 4, 1, 5];

// llamado a la funcion para imprimir en consola el array ordenado
console.log(ordenarNumeros(miArray4))


