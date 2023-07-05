import Importacion from './Importacion.js';

export default class Empresa {
	constructor(id, nombre, rut) {
		this._id = id;
		this._nombre = nombre;
		this._rut = rut;
		this._importaciones = [];
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

	getTotalImportaciones() {
		return this._importaciones.length;
	}

	getTotalImportacionesMonto() {
		return this._importaciones.reduce((total, importacion) => {
			let importa = new Importacion(
				importacion._id,
				importacion._producto,
				importacion._cantidad,
				importacion._precio_unitario
			);

			return total + importa.getTotal();
		}, 0);
	}

	getTotalPorProducto() {
		const productos = [];

		this._importaciones.forEach((importacion) => {
			const importa = new Importacion(
				importacion._id,
				importacion._producto,
				importacion._cantidad,
				importacion._precio_unitario
			);

			const res = {
				id: importa.id,
				nombre: importa.producto,
				cantidad: importa.cantidad,
				precio_unitario: importa.precio_unitario,
				total: importa.getTotal(),
			};

			productos.push(res);
		});

		return productos;
	}
}
