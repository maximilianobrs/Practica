class Empresa {
  constructor(id, nombre, rut) {
    this._id = id;
    this._nombre = nombre;
    this._rut = rut;
    this._importaciones = [];
  }

  getTotalImportaciones() {
    return this._importaciones.length;
  }

  getTotalImportacionesMonto() {
    return this._importaciones.reduce((total, importacion) => {
      let importa = new Importacion(importacion._id, importacion._producto, importacion._cantidad, importacion._precio_unitario);
      return total + importa.getTotal();
    }, 0);
  }

  getTotalPorProducto() {
    const totalPorProducto = {};
    this._importaciones.forEach((importacion) => {
      let importa = new Importacion(importacion._id, importacion._producto, importacion._cantidad, importacion._precio_unitario);
      const producto = importa.producto;
      if (!totalPorProducto[producto]) {
        totalPorProducto[producto] = { cantidad: importa.cantidad, precio_unitario: importa.precio_unitario, total: importa.getTotal() };
      } else {
        totalPorProducto[producto].total += importa.getTotal();
      }
    });
    let resultado = [];
    for (let producto in totalPorProducto) {
      resultado.push({ nombre: producto, ...totalPorProducto[producto] });
    }
    return resultado
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(value) {
    this._nombre = value;
  }

  get rut() {
    return this._rut;
  }

  set rut(value) {
    this._rut = value;
  }

  get importaciones() {
    return this._importaciones;
  }

  set importaciones(value) {
    if (value) {
      if (Array.isArray(value)) {
        if (this._importaciones.length > 0) {
          this._importaciones.concat(value);
        } else {
          this._importaciones = value;
        }

      } else {
        this._importaciones.push(value);
      }
    }
  }
}

class Importacion {
  constructor(id, producto, cantidad, precio_unitario) {
    this._id = id;
    this._producto = producto;
    this._cantidad = cantidad;
    this._precio_unitario = precio_unitario;
    console.log(id, producto, cantidad, precio_unitario)
  }

  getInfo() {
    return `ID: ${this._id}, Producto: ${this._producto}, Cantidad: ${this._cantidad}, Precio Unitario: ${this._precio_unitario}`;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get producto() {
    return this._producto;
  }

  set producto(value) {
    this._producto = value;
  }

  get cantidad() {
    return this._cantidad;
  }

  set cantidad(value) {
    this._cantidad = value;
  }

  get precio_unitario() {
    return this._precio_unitario;
  }

  set precio_unitario(value) {
    this._precio_unitario = value;
  }

  getTotal() {
    return this.cantidad * this.precio_unitario;
  }
}

// const empresa = new Empresa(1, 'Mi Empresa', '12.345.678-9');

// empresa.agregarImportacion(1, 'Producto A', 10, 100);
// empresa.agregarImportacion(2, 'Producto A', 5, 80);
// empresa.agregarImportacion(3, 'Producto B', 8, 200);
// empresa.agregarImportacion(4, 'Producto B', 15, 180);

// const totalPorProducto = empresa.getTotalPorProducto();

