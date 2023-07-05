
// CREAR CLASE CONSTRUCTORA PROVEDOR
//EXPORTAR CLASE
export class Proveedor {
    constructor(nombre, email, articulos, telefono) {
        this._nombre = nombre;
        this._email = email;
        this._articulos = articulos;
        this._telefono = telefono;
    }
    //==============================================

    get getNombre() {
        return this._nombre;
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
        return this._articulos;
    }
    set setArticulo(nuevoArticulo) {
        this._articulos = nuevoArticulo;
    }
    //==============================================

    get getTelefono() {
        return this._telefono;
    }
    set setTelefono(nuevoTelefono) {
        this._telefono = nuevoTelefono;
    }

    //CREAR METODO INFORMACION PROVEEDOR
    getInfoProveedor() {
        return `
        Contactos de ${this._nombre}
        Email: ${this._email}
        Numero: ${this._telefono}
        `
    }
    //CLEAR METODO ARTICULOS PROVEEDOR
    articulosProvedor() {
        let articuloInfo = "";
        if (this._articulos && this._articulos.length > 0) {
            for (let i = 0; i < this._articulos.length; i++) {
                articuloInfo += ` ${i + 1} - Articulo ${i + 1} Nombre: ${this._articulos[i]._nombre} Precio: ${this._articulos[i]._precio}`;
                if (i < this._articulos.length - 1) {
                    articuloInfo += ".";
                }
            }
        }
        return articuloInfo;
    }
    //CREAR METODO CALCULAR TOTAL PRECIO ARTICULOS PROVEDOR
    calcularTotal() {

        const precios = this._articulos.map(articulo => articulo.getPrecio());
        const total = precios.reduce((num1, num2) => num1 + num2, 0);
        return total;
    }
    //CREAR METODO AGREGAR ARTICULO
    agregarArticulo(element) {
        this._articulos.push(element)
    }

}

//CREAR CLASE CONSTRUCTORA EXTENDIDA DE PROVEEDOR LLAMADA TIPO_PROVEEDOR 
//EXPORTAR CLASE
export class Tipo_proveedor extends Proveedor {
    constructor(nombre, email, articulos, telefono, internacional, pais) {
        super(nombre, email, articulos, telefono)
        this._internacional = internacional;
        if (this._internacional) {
            this._pais = pais;
        }
    }
    get getInternacional() {
        return this._internacional;
    }
    set setInternaciona(nuevoInternaciona) {
        this._internacional = nuevoInternaciona;
    }
    get getPais() {
        return this._pais;
    }
    set setPais(nuevoPais) {
        this._pais = nuevoPais;
    }

}


//CREAR CLASE CONSTRUCTORA ARTICULO
//EXPORTAR CLASE
export class Articulo {
    constructor(nombre, precio) {
        this._nombre = nombre;
        this._precio = precio;
    }
    get getNombre() {
        return this._nombre;
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
    getPrecio() {
        return this._precio
    }
}

