import Empresa from '../../components/Empresa.js';
import Importacion from '../../components/Importacion.js';
import TipoEmpresa from '../../components/TipoEmpresa.js';

//Función para agregar una empresa en el LocalStorage
export const agregarEmpresaLocalStorage = (empresa) => {
	let empresas;
	empresas = obtenerLocalStorage('empresas');
	empresas.push(empresa);
	localStorage.setItem('empresas', JSON.stringify(empresas));
};

//Editar un registro de localstorage de empresas
export const editarEmpresaLocalStorage = (empresa) => {
	let empresas;
	empresas = obtenerLocalStorage('empresas');
	empresas.forEach((empresaLS, index) => {
		if (empresaLS._id === empresa.id) {
			empresas.splice(index, 1, empresa);
		}
	});
	localStorage.setItem('empresas', JSON.stringify(empresas));
};

//Función para obtener las empresas del LocalStorage
export const obtenerLocalStorage = (value) => {
	let values;
	if (localStorage.getItem(value) === null) {
		values = [];
	} else {
		values = JSON.parse(localStorage.getItem(value));
	}
	return values;
};

export const renderTable = (empresas) => {
	const listaEmpresas = document.getElementById('listaEmpresas');
	listaEmpresas.innerHTML = '';
	empresas.forEach((empresa) => {
		const { _id, _nombre, _rut, _rubro, _tamanio } = empresa;
		const oEmpresa = new Empresa(_id, _nombre, _rut, _rubro, _tamanio);

		const row = document.createElement('tr');
		row.innerHTML = `
    <td>${oEmpresa.id}</td>
    <td>${oEmpresa.nombre}</td>
    <td>${oEmpresa.rut}</td>
    <td>
      <button data-btn="btnAgregarImportaciones" data-id="${oEmpresa.id}" class="btn btn-success">Agregar Importaciones</button>
      <button data-btn="btnTotalImportaciones" data-id="${oEmpresa.id}" class="btn btn-warning">Obtener Total Importaciones</button>
      <button data-btn="btnTotalPorProductos" data-id="${oEmpresa.id}" class="btn btn-warning">Obtener Total por Producto</button>
			<button data-btn="btnVerResumen" data-id="${oEmpresa.id}" class="btn btn-info">Ver Resumen</button>
    </td>
    `;
		listaEmpresas.appendChild(row);
	});

	cargarBotones();
};

const cargarBotones = () => {
	const btnAgregarImportaciones = document.querySelectorAll(
		'[data-btn="btnAgregarImportaciones"]'
	);
	const btnTotalImportaciones = document.querySelectorAll(
		'[data-btn="btnTotalImportaciones"]'
	);
	const btnTotalPorProductos = document.querySelectorAll(
		'[data-btn="btnTotalPorProductos"]'
	);
	const btnVerResumen = document.querySelectorAll(
		'[data-btn="btnVerResumen"]'
	);

	btnAgregarImportaciones.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const idEmpresa = parseInt(btn.dataset.id);
			modalAgregarImportaciones(idEmpresa);
		});
	});

	btnTotalImportaciones.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const idEmpresa = parseInt(btn.dataset.id);
			getTotalImportaciones(idEmpresa);
		});
	});

	btnTotalPorProductos.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const idEmpresa = parseInt(btn.dataset.id);
			getTotalPorProducto(idEmpresa);
		});
	});

	btnVerResumen.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const idEmpresa = parseInt(btn.dataset.id);
			verResumen(idEmpresa);
		});
	});
};

export const renderSelect = (empresas) => {
	const selectIdEmpresa = document.getElementById('id_empresa');
	selectIdEmpresa.innerHTML =
		'<option value="">Seleccione una empresa</option>';

	empresas.forEach((empresa) => {
		const { _id, _nombre, _rut, _rubro, _tamanio } = empresa;
		const oEmpresa = new Empresa(_id, _nombre, _rut, _rubro, _tamanio);
		const row = document.createElement('option');
		row.value = oEmpresa.id;
		row.innerHTML = oEmpresa.nombre;
		selectIdEmpresa.appendChild(row);
	});
};
export const renderSelectTamanio = () => {
	const selectTamanio = document.getElementById('tamanio');
	selectTamanio.innerHTML =
		'<option value="">Seleccione un tamaño</option>';
	let tamanios = new TipoEmpresa().tamanioposibles;
	tamanios.forEach((tamanio) => {
		const row = document.createElement('option');
		row.value = tamanio;
		row.innerHTML = tamanio;
		selectTamanio.appendChild(row);
	});
};

const modalAgregarImportaciones = (idEmpresa)=> {
	const myModal = new bootstrap.Modal('#modalImportaciones', {
		keyboard: false,
	});
	const id_empresa = document.getElementById('id_empresa');
	id_empresa.value = idEmpresa;
	id_empresa.disabled = true;

	myModal.show();
}

const getTotalImportaciones = (idEmpresa) => {
	let empresas = obtenerLocalStorage('empresas');
	const empresa = empresas.find((empresa) => empresa._id == idEmpresa);
	console.log('empresa', empresa)
	const oEmpresa = new Empresa(empresa._id, empresa._nombre, empresa._rut, empresa._rubro, empresa._tamanio);
	console.log('oEmpresa', oEmpresa)
	oEmpresa.importaciones = empresa._importaciones;
	const total = oEmpresa.getTotalImportaciones();
	const totalMonto = oEmpresa.getTotalImportacionesMonto();
	showMessage(`<p>El total de importaciones de la empresa ${oEmpresa.nombre
		} es: </p>
  <strong>${total} ${total > 1 ? 'importaciones' : 'importación'
		}</strong> de un total monetario de 
  <strong>${totalMonto.toLocaleString('es-CL', {
			style: 'currency',
			currency: 'CLP',
		})}</strong>
  `);
}

const getTotalPorProducto = (idEmpresa) => {
	let empresas = obtenerLocalStorage('empresas');
	const empresa = empresas.find((empresa) => empresa._id == idEmpresa);
	const oEmpresa = new Empresa(empresa._id, empresa._nombre, empresa._rut, empresa._rubro, empresa._tamanio);
	oEmpresa.importaciones = empresa._importaciones;
	const productos = oEmpresa.getTotalPorProducto();

	let table =
		'<table class="table"><thead><tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th><th>Total</th></tr></thead><tbody>';

	productos.forEach((producto) => {
		const { nombre, total, cantidad, precio_unitario, estado } = producto;

		table += `
    <tr>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio_unitario.toLocaleString('es-CL', {
			style: 'currency',
			currency: 'CLP',
		})}</td>
    <td>${total.toLocaleString('es-CL', {
			style: 'currency',
			currency: 'CLP',
		})}</td>
		<td>
		${estado}
		</td>
    </tr>
    `;
	});

	table += '</tbody></table>';

	showMessage(
		`El total de importaciones por producto de la empresa ${oEmpresa.nombre.toUpperCase()} es: ${table}`
	);
}

const verResumen = (idEmpresa) => {
	let empresas = obtenerLocalStorage('empresas');
	const empresa = empresas.find((empresa) => empresa._id == idEmpresa);
	const oEmpresa = new Empresa(empresa._id, empresa._nombre, empresa._rut, empresa._rubro, empresa._tamanio);

	oEmpresa.importaciones = empresa._importaciones;
	const productosEstado = oEmpresa.getTotalPorProductoEstado();

	let table =
		'<table class="table"><thead><tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th><th>Total</th><th>Estado</th></tr></thead><tbody>';
	let tbody = {}
	let estados = []
	productosEstado.forEach((producto) => {
		const { nombre, total, cantidad, precio_unitario, estado } = producto;
		if (!estados.includes(estado)) {
			estados.push(estado)
		}
		tbody[estado] = tbody[estado] || ''

		tbody[estado] += `
		<tr>
			<td>${nombre}</td>
			<td>${cantidad}</td>
			<td>${precio_unitario.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
			<td>${total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', })}</td>
			<td>${estado}</td>
    </tr>
    `;
	});
	table += estados.map(item => tbody[item]).join('') + '</tbody></table>';

	const total = oEmpresa.getTotalImportacionesEstado();
	const totalMonto = oEmpresa.getTotalImportacionesMontoEstado();

	let totalImportaciones = ''
	estados.forEach((estado) => {
		totalImportaciones += `
		Importaciones con estado: <strong>${estado}</strong><br/>
		<strong>${total[estado]} ${total[estado] > 1 ? 'importaciones' : 'importación'}</strong> de un total monetario de 
		<strong>${totalMonto[estado].toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</strong><br/>
		<hr/>
		`
	})



	let mensajeMostrar = `
<div class="card">
  <div class="card-header">
				<h5 class="card-title">Resumen de importaciones de la empresa ${oEmpresa.nombre.toUpperCase()}</h5>   
  </div>
  <div class="card-body">
		<div class="row">
			<div class="col-12 col-md-6">
			<div class="alert alert-primary" role="alert">
				ID ${oEmpresa.id} <br/> 
				RUT: <strong>${oEmpresa.rut}</strong> <br/>
		</div>
			</div>
			<div class="col-12 col-md-6">
					<div class="alert alert-success" role="alert">
					<label for="rubro" class="form-label">Rubro:</label>
					<span>${oEmpresa.rubro}</span> 
					<label for="tamanio" class="form-label">Tamaño de la empresa:</label>
					<span>${oEmpresa.tamanio}</span>
		</div> 
			</div> 
			<div class="col-12 col-md-6">
				<div class="mb-3">
					<label for="total_importaciones" class="form-label">Total importaciones es:</label>
					<div class="form-control"> 
						${totalImportaciones}
					</div>
				</div> 
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				${table}
			</div>
		</div>
  </div>
</div>  `
	showMessage(mensajeMostrar);

}


export const showMessage = (message) => {
	const myModal = new bootstrap.Modal('#modalMessage', {
		keyboard: false,
	});
	const messageModal = document.getElementById('messageModal');
	messageModal.innerHTML = message;
	myModal.show();
};

export var Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut: function (rutCompleto) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
		var tmp = rutCompleto.split('-');
		var digv = tmp[1];
		var rut = tmp[0];
		if (digv == 'K') digv = 'k';
		return Fn.dv(rut) == digv;
	},
	dv: function (T) {
		var M = 0,
			S = 1;
		for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
		return S ? S - 1 : 'k';
	},
};
