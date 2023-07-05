import Importacion from './Importacion.js';
import TipoEmpresa from './TipoEmpresa.js';

export default class Empresa extends TipoEmpresa {
	constructor(id, nombre, rut, rubro = '', tamanio = '') {
		super(rubro, tamanio);
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
	getTotalImportacionesEstado() {
		const totalImportaciones = [];
		this._importaciones.forEach((importacion) => {
			let importa = new Importacion(importacion._id, importacion._producto, importacion._cantidad, importacion._precio_unitario, importacion._estado);
			const estado = importa.estado;

			if (!totalImportaciones[estado]) {
				totalImportaciones[estado] = 1;
			} else {
				totalImportaciones[estado]++;
			}

		});
		return totalImportaciones;
	}

	getTotalImportacionesMonto() {
		return this._importaciones.reduce((total, importacion) => {
			let importa = new Importacion(
				importacion._id,
				importacion._producto,
				importacion._cantidad,
				importacion._precio_unitario,
				importacion._estado

			);

			return total + importa.getTotal();
		}, 0);
	}

	getTotalImportacionesMontoEstado() {
		const totalImportacionesMontoEstado = [];
		this._importaciones.forEach((importacion) => {
			let importa = new Importacion(importacion._id, importacion._producto, importacion._cantidad, importacion._precio_unitario, importacion._estado);
			const estado = importa.estado;

			if (!totalImportacionesMontoEstado[estado]) {
				totalImportacionesMontoEstado[estado] = importa.getTotal();
			} else {
				totalImportacionesMontoEstado[estado] += importa.getTotal();
			}

		});
		return totalImportacionesMontoEstado;
	}

	getTotalPorProducto() {
		const totalPorProducto = {};
		this._importaciones.forEach((importacion) => {
			let importa = new Importacion(importacion._id, importacion._producto, importacion._cantidad, importacion._precio_unitario, importacion._estado);
			const producto = importa.producto;
			if (!totalPorProducto[producto]) {
				totalPorProducto[producto] = { cantidad: importa.cantidad, precio_unitario: importa.precio_unitario, estado: importa.estado, total: importa.getTotal() };
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

	getTotalPorProductoEstado() {
		const totalPorProducto = [];
		this._importaciones.forEach((importacion) => {
			let importa = new Importacion(importacion._id, importacion._producto, importacion._cantidad, importacion._precio_unitario, importacion._estado);
			const producto = importa.producto;
			const estado = importa.estado;

			if (!totalPorProducto[producto]) {
				totalPorProducto[producto] = []
			}

			if (!totalPorProducto[producto][estado]) {
				totalPorProducto[producto][estado] = { cantidad: importa.cantidad, precio_unitario: importa.precio_unitario, estado: importa.estado, total: importa.getTotal() };
			} else {
				totalPorProducto[producto][estado].total += importa.getTotal();
			}
		});
		let resultado = [];
		for (let producto in totalPorProducto) {
			console.log('producto', producto)
			for (let estado in totalPorProducto[producto]) {
				console.log('estado', estado)
				resultado.push({ nombre: producto, ...totalPorProducto[producto][estado] });
			}
		}
		return resultado
	}
}
