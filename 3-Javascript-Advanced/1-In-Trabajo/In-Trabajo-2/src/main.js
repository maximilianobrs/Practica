import { Proveedor } from "./components/Objects";
import { Articulo } from "./components/Objects";

const ar1 = new Articulo('Articulo 1', 20000);
const ar2 = new Articulo('Articulo 2', 40000);

const p1 = new Proveedor('amazon', 'email@proveedor.com',[ar1,ar2,ar1], '123456789');
const p2 = new Proveedor('mercado', 'email@proveedor.com',[ar2], '987654321');

console.log(p1)
console.log(p2)
console.log(p1._articulo)
console.log(p1._articulo)
console.log(p1.getInfoProveedor())
console.log(p1.calcularTotal());

