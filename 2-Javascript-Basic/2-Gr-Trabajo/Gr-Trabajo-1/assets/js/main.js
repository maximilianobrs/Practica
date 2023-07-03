document.addEventListener('DOMContentLoaded', () => {
	document
		.querySelector('#formCelsius')
		?.addEventListener('submit', tranformarGrados);
	document
		.querySelector('#formDias')
		?.addEventListener('submit', transformarDiasEnAniosSemanasDias);

	document
		.querySelector('#calcularSumar')
		?.addEventListener('click', suma5Numeros);
});

/*
1.Crear un programa que pida al usuario ingresar la temperatura en grados Celsius y que la transforme a grados Kelvin y Fahrenheit.
Se debe considerar la siguiente información respecto a la equivalencia de las escalas de temperatura:
	0 Grados Celsius corresponden a 273,15 Kelvin. La fórmula para convertirlos es 0 °C + 273.15 = 273.15 K
	0 Grados Celsius corresponden a 32 Fahrenheit. La fórmula para convertirlos es (0 °C × 9/5) + 32 = 32 °F

2.Crear un programa que pida al usuario una cantidad de días y que muestre su equivalente en Años, Semanas y Días. Por ejemplo, si el usuario ingresa 373, el resultado debe ser 1 año, 1 semana y 1 día. 
Se debe considerar lo siguiente:
	1 año tiene 365 días
	1 semana tiene 7 días
	Se recomienda usar la función Math.floor para obtener la parte entera de un número decimal.

3. Crear un programa que solicite al usuario 5 números y realice los cálculos que se piden a continuación. 
	La suma de todos los números.
	El promedio de los 5 números ingresados.
*/

// // 1. Transformar grados Celsius a Kelvin y Fahrenheit
const tranformarGrados = function (event) {
	event.preventDefault();

	// let celsius = parseInt(prompt('Ingrese la temperatura en grados Celsius'));

	let celsius = document.querySelector('#grados')?.value;

	if (!celsius || isNaN(celsius)) {
		return 'Error';
	}
	let tipo = document.querySelector('[name="temperatura"]:checked')?.value;
	// let resultadoKelvin
	// let resultadoFahrenheit

	// function celsiusKelvin(temperatura) {
	// 	resultadoKelvin = temperatura + 273.15;
	// }

	// function celsiusFarenheit(temperatura) {
	// 	resultadoFahrenheit = (temperatura * 9) / 5 + 32;
	// }

	// // Declaración de Funciones
	let resultadoKelvin = '';
	let resultadoFahrenheit = '';
	switch (tipo) {
		case 'kelvin':
			resultadoKelvin = `El valor en grados Kelvin es ${celsiusKelvin(
				celsius
			)}.`;
			break;
		case 'fahrenheit':
			resultadoFahrenheit = `El valor en grados Farenheit es ${celsiusFarenheit(
				celsius
			)}.`;
			break;
		case 'ambos':
			resultadoFahrenheit = `El valor en grados Farenheit es ${celsiusFarenheit(
				celsius
			)}.`;
			resultadoKelvin = `<br/> El valor en grados Kelvin es ${celsiusKelvin(
				celsius
			)}.`;
			break;
		default:
			resultadoKelvin = 'error';
			break;
	}
	console.log(event);
	// // Ejecución
	addMessages(resultadoKelvin + resultadoFahrenheit);
};

// // 2. Dias a (Años, semanas y días)

const transformarDiasEnAniosSemanasDias = function (event) {
	event.preventDefault();
	// let dias = parseInt(
	// 	prompt(
	// 		'Ingrese una cantidad de dias y lo convertires en años, semanas y dias'
	// 	)
	// );
	let dias = document.querySelector('#dias')?.value;
	if (!dias || isNaN(dias)) {
		return 'Error';
	}
	// 700 - 365 = 335
	// 700 - 1 * 365 = 335
	// 1000 - 2 * 365 = 270
	// 365 * 2 = 730
	let anio = Math.floor(dias / 365);
	let semana = Math.floor((dias - anio * 365) / 7);
	let dia = Math.floor(dias - (anio * 365 + semana * 7));

	addMessages(`${anio} año, ${semana} semana y ${dia} día`);
};

// // 3. Suma y promedio de 5 numeros
// const pedirNumero = (texto) => parseInt(prompt(`Ingrese el ${texto} numero`));

// let primer = pedirNumero('primer');
// let segundo = pedirNumero('segundo');
// let tercer = pedirNumero('tercer');
// let cuarto = pedirNumero('cuarto');
// let quinto = pedirNumero('quinto');

// let suma = primer + segundo + tercer + cuarto + quinto;
// let promedio = suma / 5;

// alert(
// 	`La suma de todos los numeros es ${suma} y el promedio de los 5 numeros ingresados es ${promedio}`
// );
const suma5Numeros = () => {
	let i = 0;
	let suma = 0;

	while (i < 5) {
		let numero = parseInt(prompt(`Ingrese un numero | (${i + 1} de 5)`));
		if (!numero || isNaN(numero)) {
			continue;
		} else {
			suma = suma + numero;

			i++;
		}
	}

	let promedio = suma / 5;

	// alert(
	// 	`La suma de todos los numeros es ${suma} y el promedio de los 5 numeros ingresados es ${promedio}`
	// );
	addMessages(
		`La suma de todos los numeros es ${suma} y el promedio de los 5 numeros ingresados es ${promedio}`
	);
};

//Funciones de la transformación de Celsius a Kelvin y Farenheit
const celsiusKelvin = (celsius) => celsius + 273.15;
const celsiusFarenheit = (celsius) => (celsius * 9) / 5 + 32;

//Agregar Mensajes
const addMessages = (mensaje) => {
	if (mensaje) {
		let div = document.createElement('div');
		div.classList.add('alert', 'alert-primary');
		div.setAttribute('role', 'alert');
		div.innerHTML = mensaje;
		let mensajes = document.getElementById('mensajes');
		mensajes.appendChild(div);
	}
};
