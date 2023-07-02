import http from 'http';
import {
  getMostrarMenu,
  postAgregarPlato,
  deletePlato
}
  from './funciones.js'


const server = http.createServer((req, res) => {
  // Obtener la ruta y el método de la solicitud
  const { url, method } = req;
  switch (method) {
    case 'GET':
      if (url === '/menu') {
        getMostrarMenu(req, res);
      };
      break;
    case 'POST':
      if (url === '/agregar') {
        postAgregarPlato(req, res);
      }
      break
    case 'DELETE':
      if (url === '/eliminar') {
        deletePlato(req, res);
      }
      break
    default:
      break;
  }
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => console.log("servidor arriba en el puerto 3000"));