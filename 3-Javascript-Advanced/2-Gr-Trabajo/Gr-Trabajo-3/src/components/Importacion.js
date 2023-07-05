export default class Importacion {
	constructor(id, producto, cantidad, precio_unitario, estado) {
		this._estadoImportacion = ['Visado', 'Prohibido']
		this._id = id;
		this._producto = producto;
		this._cantidad = cantidad;
		this._precio_unitario = precio_unitario;

		if (this._estadoImportacion.includes(estado)) {
			this._estado = estado;
		} else {
			this._estado = 'Visado';
		}

	}
	set estadoImportacion(value) { }
	get estadoImportacion() {
		return this._estadoImportacion
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
	get estado() {
		return this._estado;
	}
	set estado(value) {
		this._estadoImportacion.forEach((estado) => {
			if (estado === value) {
				this._estado = value
			}
		})
	}

	getInfo() {
		return `ID: ${this._id}, Producto: ${this._producto}, Cantidad: ${this._cantidad}, Precio Unitario: ${this._precio_unitario}`;
	}

	getTotal() {
		return this.cantidad * this.precio_unitario;
	}
}
