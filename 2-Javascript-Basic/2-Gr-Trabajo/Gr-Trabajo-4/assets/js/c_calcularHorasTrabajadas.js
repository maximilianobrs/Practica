/*
c) Crear función para calcular las horas trabajadas por jornada, en base a dos datos solicitados de ingresar por el usuario: la fecha y hora de ingreso y la fecha y hora de salida.
- Una persona puede ingresar y salir el mismo día (diferencia de horas es hora salida – hora entrada)
- Una persona puede ingresar un día y salir al siguiente (similar al anterior, pero con fecha hora)
- El dato de salida NO puede ser con 2 días de diferencia, esto es que haya trabajado más de 24 horas, por lo que se debe validar la segunda fecha y hora ingresada con respecto a la primera.
*/
function calcularHorasTrabajadas(fechaIngreso, fechaSalida) {
  var ingreso = new Date(fechaIngreso);
  var salida = new Date(fechaSalida);
  let mensajeCompleto = "";
  if (isNaN(ingreso) || isNaN(salida)) {
    mensajeCompleto = "Las fechas ingresadas no son válidas.";
    return { mensajeCompleto };
  }

  // Validar que la segunda fecha y hora ingresada no tenga más de 24 horas de diferencia
  var horasDiferencia = Math.abs(salida - ingreso) / 36e5;
  if (horasDiferencia > 24) {
    mensajeCompleto = "La diferencia de horas no puede ser mayor a 24 horas.";
    return { mensajeCompleto };
  }

  // Calcular las horas trabajadas
  var horasTrabajadas = Math.abs(salida - ingreso) / 36e5;

  mensajeCompleto = "Horas trabajadas: " + horasTrabajadas;
  return { mensajeCompleto }
}
// Ejemplo de uso
calcularHorasTrabajadas("2021-09-01T08:00:00", "2021-09-02T07:59:59");


