
export class Proveedor {
    constructor(nombre, email, articulo, telefono) {
        this._nombre = nombre;
        this._email = email;
        this._articulo = articulo || [];
        this._telefono = telefono
    }
    //==============================================

    get getNombre() {
        return this._nombre
    }
    set setNombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }
    //==============================================

    get getEmail() {
        return this._email;
    }
    set setEmail(nuevoEmail) {
        this._email = nuevoEmail;
    }
    //==============================================

    get getArticulo() {
        return this._articulo;
    }
    set setArticulo(nuevoArticulo) {
        this._articulo = nuevoArticulo;
    }
    //==============================================

    get getTelefono() {
        return this._telefono;
    }
    set setTelefono(nuevoTelefono) {
        this._telefono = nuevoTelefono;
    }
    //==============================================

    // METODO PARA DAR LA INFORMACION DEL PROVEEDOR 
    getInfoProveedor() {
        return `El proveedor ${this._nombre} se puede contactar al teléfono ${this._telefono} `
    }
    //METODA PARA CALCULAR EL TOTAL DEL PRECIO DE CADA ARTICULO
    calcularTotal() {
        const precios = this._articulo.map(articulo => articulo.getPrecio());
        const total = precios.reduce((a, b) => a + b, 0);
        return total;
    }
}

export class Articulo {
    constructor(nombre, precio) {
        this._nombre = nombre;
        this._precio = precio;
    }
    get getNombre() {
        return this._nombre
    }
    set setNombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }
    get getPrecio() {
        return this._precio;
    }
    set setPrecio(nuevoPrecio) {
        this._precio = nuevoPrecio;
    }
    
    //METODO QUE ENTREGA EL PRECIO DEL ARTICULO
    getPrecio() {
        return this._precio;
    }

}




