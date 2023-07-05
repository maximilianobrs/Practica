export default class Importacion {
	constructor(id, producto, cantidad, precio_unitario) {
		this._id = id;
		this._producto = producto;
		this._cantidad = cantidad;
		this._precio_unitario = precio_unitario;
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

	getInfo() {
		return `ID: ${this._id}, Producto: ${this._producto}, Cantidad: ${this._cantidad}, Precio Unitario: ${this._precio_unitario}`;
	}

	getTotal() {
		return this.cantidad * this.precio_unitario;
	}
}
