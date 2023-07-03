// 1. Cree una función que reciba como parámetros NOMBRE y APELLIDOS de una persona y
// devuelva el valor de ellos en mayúsculas.


function Persona(nombre, apellidos, sueldoActual, sueldoAnterior, cargaFamiliar, cantidadCarga) {
    this.nombre = nombre.toUpperCase();
    this.apellidos = apellidos.toUpperCase();
    this.sueldoActual = sueldoActual;
    this.sueldoAnterior = sueldoAnterior;
    this.cargaFamiliar = cargaFamiliar;
    this.cantidadCarga = cantidadCarga;

}
// 2. Cree una segunda función que muestre los datos de Nombre y Apellidos y solicite dos
// montos (dos números enteros) para sueldo base actual y sueldo base promedio del
// semestre anterior, que ingrese el dato de si tiene cargas familiares autorizadas y, si tiene
// cargas familiares autorizadas, retorne otro entero que sea el valor que le corresponde según
// la tabla siguiente:

// El valor a usar como renta es el monto del semestre anterior.
// La respuesta será: “Al Trabajador NOMBRE APELLIDOS le corresponde valor de familiar
// (0, 3264, 10327 o 16828) por su renta del semestre anterior que es: monto (uno de los 4).

function validacionCargaFamiliar(persona) {
    let sueldoActual = persona.sueldoActual;
    let sueldoAnterior = persona.sueldoAnterior;
    let cargaFamiliar = persona.cargaFamiliar;
    let cantidadCarga = persona.cantidadCarga;


    if (cargaFamiliar === 'Si' || cargaFamiliar === 'si') {

        let asignacion = asignacionFamiliar(sueldoAnterior, cantidadCarga)
        let valorRenta = asignacion.renta;
        let valorCarga = asignacion.valor;

        let mensaje = (`Usten es ${persona.nombre} ${persona.apellidos}:\n <br>- sueldo base actual: ${sueldoActual.toLocaleString('es-CL')} CLP\n <br>- sueldo anterior: ${sueldoAnterior.toLocaleString('es-CL')} CLP\n <br>- carga familiar autorizada: ${cargaFamiliar}\n <br>- carga familiar total: ${cantidadCarga}\n <br> Al Trabajador  ${persona.nombre} ${persona.apellidos} le corresponde valor de familiar de ${valorRenta.toLocaleString('es-CL')} CLP por su renta del semestre anterior que es: ${valorCarga.toLocaleString('es-CL')} CLP`)
        document.querySelector("#resultado").innerHTML = mensaje;
        console.log(mensaje)

    } else if (cargaFamiliar === 'No' || cargaFamiliar === 'no') {
        console.log('entro a no')

        let mensaje = (`Usten es ${persona.nombre} ${persona.apellidos}:\n <br>- sueldo base actual: ${sueldoActual.toLocaleString('es-CL')} CLP\n <br>- sueldo anterior: ${sueldoAnterior.toLocaleString('es-CL')} CLP\n <br>- carga familiar autorizada: ${cargaFamiliar}`)
        document.querySelector("#resultado").innerHTML = mensaje;
    } else {
        console.log('La respuesta ingresada no es válida. ingresar "Si" o "No".');
    }
}

// 3. Cree una función que, para las personas que si tienen asignación familiar, consulte la
// cantidad de “beneficiados con carga familiar (recibe como parámetro un número entero r
// que indique la cantidad de personas con el beneficio) y retorne el número que corresponda
// al monto a recibir por carga familiar, obtenido en el punto anterior, multiplicado por la

// cantidad de beneficiarios. Por ejemplo, una persona con beneficio de 10327 y 3 cargas
// familiares deberá responder con 30981.

function asignacionFamiliar(sueldoAnterior, cantidadCarga) {

    let renta = 0;
    let valor = 0;
    let asignacion = {};

    if (sueldoAnterior >= 0 && sueldoAnterior <= 429899) {
        console.log('entro a renta 1')
        renta = 16828;
        valor = renta * cantidadCarga;

    } else if (sueldoAnterior > 429899 && sueldoAnterior <= 627913) {
        console.log('entro a renta 2')
        renta = 10327;
        valor = renta * cantidadCarga;

    } else if (sueldoAnterior > 627913 && sueldoAnterior <= 979330) {
        console.log('entro a renta 3')
        renta = 3264;
        valor = renta * cantidadCarga;
    } else {
        renta = 0
    }

    asignacion.valor = valor;
    asignacion.renta = renta;
    return asignacion;
}

// 4. Cree un programa que utilice el objeto persona y entregue todos los datos obtenidos, de
// las funciones anteriores:
// • La persona de:
// o Nombre:
// o Apellidos:
// o Cargas (si/no):
// o Cantidad de Cargas familiares:
// o Está en el tramo que corresponde al ingreso del semestre anterior:
// o Le corresponde por carga familiar el monto:
// o Le corresponde el monto total de carga familiar de:
// o Su sueldo del mes más las cargas familiares es de:

function ingresarDatos() {
    let nombre = prompt("Ingrese el nombre:");
    let apellidos = prompt("Ingrese los apellidos:");
    let sueldoActual = parseInt(prompt("Ingrese el sueldo actual:"));
    let sueldoAnterior = parseInt(prompt("Ingrese el sueldo anterior:"));
    let cargaFamiliar = prompt("¿Tiene carga familiar? (Si/No)");
    let cantidadCarga = 0;

    if (cargaFamiliar.toLowerCase() === "si") {
        cantidadCarga = parseInt(prompt("Ingrese la cantidad de cargas familiares:"));
    }

    persona1 = new persona(nombre, apellidos, sueldoActual, sueldoAnterior, cargaFamiliar, cantidadCarga);
    validacionCargaFamiliar(persona1);
}

ingresarDatos();
