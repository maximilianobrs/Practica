const { exec } = require('child_process');

const nombreArchivo = 'cotizacion';
const extension = 'txt';
const pesos = 500000;
const cambio = 'dolar';

exec(`node ./cotizacion.mjs ${nombreArchivo} ${extension} ${pesos} ${cambio}`, (err, result) => {
  if (err) throw err;
  console.log(result);
});
