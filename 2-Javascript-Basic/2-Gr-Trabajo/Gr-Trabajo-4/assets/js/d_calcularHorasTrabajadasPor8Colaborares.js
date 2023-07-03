/*
d) Crear una función que obtenga con un ciclo la cantidad de horas que han permanecido los 8 trabajadores de la empresa y entregue la suma total de horas trabajadas.
- Una persona debe trabajar desde 4 horas y cero minutos en adelante (validarlo)
- Una persona no puede trabajar sobre 12 horas y cero minutos (validarlo)
- La respuesta de esta función es un mensaje en pantalla que indique las horas y minutos totales trabajados por los 8 colaboradores.
*/

function calcularHorasTrabajadasPor8Colaborares() {
  var totalHoras = 0;
  var totalMinutos = 0;

  for (var i = 1; i <= 8; i++) {
    var horas = parseInt(prompt("Ingrese las horas trabajadas por el colaborador " + i));
    var minutos = parseInt(prompt("Ingrese los minutos trabajados por el colaborador " + i));

    if(isNaN(horas) || isNaN(minutos)) {
      return {
        mensajeCompleto: "Las horas y minutos deben ser números"
      }
    }
    // Validar que las horas y minutos estén dentro de los rangos permitidos
    if (horas < 4) {
      return {
        mensajeCompleto: "Un colaborador debe trabajar desde 4 horas y cero minutos en adelante"
      }
    }
    if (horas == 12 && minutos > 0) {
      return {
        mensajeCompleto: "Un persona no puede trabajar sobre 12 horas y cero minutos"
      }
    }
    if(minutos < 0 || minutos > 59) {
      return {
        mensajeCompleto: "Los minutos deben estar entre 0 y 59"
      }
    }

    totalHoras += horas;
    totalMinutos += minutos;

    // Convertir los minutos excedentes a horas si superan los 60 minutos
    if (totalMinutos >= 60) {
      totalMinutos -= 60;
      totalHoras++;
    }
  }

  return {
    mensajeCompleto: "Total de horas trabajadas por los 8 colaboradores: " + totalHoras + " horas y " + totalMinutos + " minutos."
  }
}