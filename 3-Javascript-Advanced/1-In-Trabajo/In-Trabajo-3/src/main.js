// import { Proveedor } from "./assets/js/clases";
import { Tipo_proveedor } from "./assets/js/clases";
import { Articulo } from "./assets/js/clases";




let p1 = new Tipo_proveedor('ABC Co.', 'abc@co.com', [], '1234', true, 'USA');

let p2 = new Tipo_proveedor('XYZ Inc.', 'xyz@inc.com', [], '5678', false);

let p3 = new Tipo_proveedor('123 Corp.', '123@corp.com', [], '9876', true, 'Chile');

let ar1 = new Articulo("casa", 5000)
let ar2 = new Articulo("silla", 24000)



p1.agregarArticulo(ar1)
p1.agregarArticulo(ar2)
p2.agregarArticulo(ar1)

console.log(p1)
console.log(p2)
console.log(p3)
console.log(p2.getInfoProveedor())
console.log(p1.articulosProvedor())
console.log(p1.calcularTotal())
console.log(p2.getInfoProveedor())
console.log(p2.articulosProvedor())
console.log(p2.calcularTotal())