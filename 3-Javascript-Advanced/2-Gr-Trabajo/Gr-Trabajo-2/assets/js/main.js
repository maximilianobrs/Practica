document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Formularios
	 */

	// Primer formulario
	const formNacimiento = () => {
		document.getElementById('nacimiento').innerHTML = `
		<h4>Ingrese su fecha de nacimiento</h4>
		<div class="box-row">
			<div class="box-col">
				<label for="anioNacimiento">Año de Nacimiento</label>
				<select name="anioNacimiento" id="anioNacimiento">
				<option disabled selected value="2023">
				Seleccione año de nacimiento
				</option>
				</select>
			</div>

			<div class="box-col">
				<label for="mesNacimiento">Mes de Nacimiento</label>
				<select type="number" name="mesNacimiento" id="mesNacimiento">
					<option disabled selected value="12">
					Seleccione mes de nacimiento
					</option>
				</select>
			</div>
		</div>
		`;
	};

	// Segundo formulario
	const formCarga = () => {
		document.getElementById('carga').innerHTML = `
		<h4>¿Es carga familiar?</h4>
		<label for="siCarga">Si</label>
		<input type="radio" name="carga" id="siCarga" value="0" />
		<label for="noCarga">No</label>
		<input type="radio" name="carga" id="noCarga" value="1" />`;
	};

	// Tercer formulario
	const formTrabajador = () => {
		document.getElementById('trabajador').innerHTML = `
		<h4>¿Es trabajador activo?</h4>
		<label for="trabajadorActivo">Trabajador activo</label>
		<input type="radio" name="trabajador" id="trabajadorActivo" value="1" />
		<label for="trabajadorInactivo">No es trabajador</label>
		<input type="radio" name="trabajador" id="trabajadorInactivo" value="0" />`;
	};

	// Cuarto formulario
	const formIngresoAnioMes = () => {
		document.getElementById('ingreso').innerHTML = `
		<h4>Ingrese año de ingreso a trabajar</h4>
		<div class="box-row">
			<div class="box-col">
				<label for="anioIngreso">Año de Ingreso</label>
				<select name="anioIngreso" id="anioIngreso">
				<option disabled selected value="0">
				Seleccione año de ingreso
				</option>
				</select>
			</div>
			<div class="box-col">
				<label for="mesIngreso">Mes de Ingreso</label>
				<select type="number" name="mesIngreso" id="mesIngreso">
				<option disabled selected value="0">
					Seleccione mes de ingreso
				</option>
				</select>
			</div>
		</div>`;
	};

	/**
	 * Fin Formularios
	 */

	/**
	 * Inicio de aplicación
	 */

	const app = () => {
		formNacimiento();
		formCarga();
		formTrabajador();
		formIngresoAnioMes();
	};

	app();

	/**
	 * Constantes
	 */

	// ID's de los distintos elementos del DOM
	const anioNacimiento = document.getElementById('anioNacimiento');
	const mesNacimiento = document.getElementById('mesNacimiento');
	const siCarga = document.getElementById('siCarga');
	const noCarga = document.getElementById('noCarga');
	const trabajadorActivo = document.getElementById('trabajadorActivo');
	const trabajadorInactivo = document.getElementById('trabajadorInactivo');
	const ingreso = document.getElementById('ingreso');
	const anioIngreso = document.getElementById('anioIngreso');
	const mesIngreso = document.getElementById('mesIngreso');
	const informe = document.getElementById('informe');
	const generarInforme = document.getElementById('generarInforme');

	// Relleno de años
	for (let anio = 2023; anio >= 1900; anio--) {
		anioNacimiento.innerHTML += `<option value="${anio}">${anio}</option>`;
	}

	// Relleno de meses
	for (let mes = 1; mes <= 12; mes++) {
		mesNacimiento.innerHTML += `<option value="${mes}">${mes}</option>`;
	}

	// Asignar rango etario
	const rangoEtario = (edad) => {
		if (edad >= 0 && edad < 2) return 'infante';
		if (edad >= 2 && edad < 12) return 'niño';
		if (edad >= 12 && edad < 18) return 'adolescente';
		if (edad >= 18 && edad < 65) return 'adulto';
		if (edad >= 65 && edad < 85) return 'adulto mayor';
		if (edad >= 85) return 'años dorados';

		return 'nonato';
	};

	// Preguntar si es carga familiar y asignar rango etario
	siCarga.addEventListener('click', () => {
		trabajadorActivo.checked = false;
		trabajadorInactivo.checked = false;
		trabajadorActivo.setAttribute('disabled', true);
	});

	noCarga.addEventListener('click', () => {
		trabajadorActivo.checked = false;
		trabajadorInactivo.checked = false;
		trabajadorActivo.removeAttribute('disabled');
	});

	// Cálculo de Edad
	const calcularEdad = () => {
		let anio = 0;
		let mes = 0;
		let anioNac = anioNacimiento.value;
		let mesNac = mesNacimiento.value;
		let fechaActual = new Date();
		let anioActual = fechaActual.getFullYear();
		let mesActual = fechaActual.getMonth() + 1;

		if (!fechaValida(anioNac, mesNac)) {
			return [-1, -1];
		}

		anio = anioActual - anioNac;
		mes = mesActual - mesNac;

		if (mesActual < mesNac) {
			anio--;
		}

		if (mes < 0) {
			mes = 12 + mes;
		}

		return [anio, mes];
	};

	// Preguntar si la persona es trabajador activo, si lo es, preguntar el año y mes de ingreso
	trabajadorActivo.addEventListener('click', () => {
		ingreso.classList.remove('invisible');

		for (let anio = 2023; anio >= 1900; anio--) {
			anioIngreso.innerHTML += `<option value="${anio}">${anio}</option>`;
		}

		for (let mes = 1; mes <= 12; mes++) {
			mesIngreso.innerHTML += `<option value="${mes}">${mes}</option>`;
		}
	});

	trabajadorInactivo.addEventListener('click', () => {
		ingreso.classList.add('invisible');
	});

	// Mostrar cuantos años y meses ha trabajado
	const mensajeAniosTrabajador = () => {
		// Donde se mostrará el mensaje
		const mensaje = document.getElementById('aniosTrabajados');

		const [aniosTrabajados, mesesTrabajados] = calcularAniosMeses();

		if (aniosTrabajados === -1 && mesesTrabajados === -1) {
			mensaje.innerHTML = `<h4>Fecha de ingreso no válida.</h4>`;
			return;
		}

		// Mensaje que se mostrará
		mensaje.innerHTML = `<h4>${aniosTrabajados} años y ${mesesTrabajados} meses trabajados.</h4>`;
	};

	const calcularAniosMeses = () => {
		// Valores del formulario
		let anioEntrada = anioIngreso.value;
		let mesEntrada = mesIngreso.value;

		// Validación de año de ingreso y mes de ingreso no sea mayor al actual
		if (!fechaValida(anioEntrada, mesEntrada)) {
			return [-1, -1];
		}

		// Cálculo de años y meses trabajados
		let fechaActual = new Date();
		let anioActual = fechaActual.getFullYear();
		let mesActual = fechaActual.getMonth() + 1;
		let aniosTrabajados = anioActual - anioEntrada;
		let mesesTrabajados = mesActual - mesEntrada;

		// Validación de meses trabajados
		if (mesActual < mesEntrada) {
			aniosTrabajados--;
			mesesTrabajados = 12 - (mesEntrada - mesActual);
		}

		if (mesActual == mesEntrada) {
			mesesTrabajados = 0;
		}

		return [aniosTrabajados, mesesTrabajados];
	};

	anioIngreso.addEventListener('change', () => {
		mensajeAniosTrabajador();
		mensajeMeses();
	});

	mesIngreso.addEventListener('change', () => {
		mensajeAniosTrabajador();
		mensajeMeses();
	});

	// Validar año de nacimiento o ingreso, no ser mayor al actual
	const fechaValida = (anio, mes) => {
		let fechaActual = new Date();
		let anioActual = fechaActual.getFullYear();
		let mesActual = fechaActual.getMonth() + 1;

		if (anio > anioActual) {
			return false;
		}

		if (anio == anioActual && mes > mesActual) {
			return false;
		}

		return true;
	};

	// Mensaje a los trabajadores activos que indique cuantos meses faltan para cumplir un año mas de permanencia
	const mensajeMeses = () => {
		// Donde se mostrará el mensaje
		const mensaje = document.getElementById('mesesParaAnio');

		// Valores del formulario
		let anioEntrada = anioIngreso.value;
		let mesEntrada = mesIngreso.value;

		// Validación de año de ingreso y mes de ingreso no sea mayor al actual
		if (!fechaValida(anioEntrada, mesEntrada)) {
			mensaje.innerHTML = `<h4>Ingrese un año y mes de ingreso válido</h4>`;
			return;
		}

		// Mensaje que se mostrará
		mensaje.innerHTML = `<h4>Faltan ${mesesPorCumplir(
			mesEntrada
		)} meses para cumplir otro año.</h4>`;
	};

	// Cálculo de meses por cumplir otro año
	const mesesPorCumplir = (mesEntrada) => {
		// Cálculo de meses para cumplir otro año
		let fechaActual = new Date();
		let mesActual = fechaActual.getMonth() + 1;
		let mesesPorCumplir = 0;

		if (mesActual < mesEntrada) {
			mesesPorCumplir = mesEntrada - mesActual;
		}

		if (mesActual == mesEntrada) {
			mesesPorCumplir = 0;
		}

		if (mesActual > mesEntrada) {
			mesesPorCumplir = 12 - (mesActual - mesEntrada);
		}

		return mesesPorCumplir;
	};

	/** Generar informe para los datos ingresados
	 * La persona es un trabajador activo con <años trabajados> años y <meses trabajados> meses en la organizacion y en <meses por cumplir otro año> meses cumple el proximo año
	 * La persona es un <rango etario>, <Carga familiar> con <años de vida> años y <meses de vida> meses
	 * Nonato, sin edad ni es carga familiar
	 */
	generarInforme.addEventListener('click', () => {
		const [aniosVida, mesesVida] = calcularEdad();
		const edadEtaria = rangoEtario(aniosVida);

		if (trabajadorActivo.checked) {
			const [aniosTrabajados, mesesTrabajados] = calcularAniosMeses();

			informe.innerHTML = `<h4>La persona es un trabajador activo con ${aniosTrabajados} años y ${mesesTrabajados} meses en la organizacion y en ${mesesPorCumplir(
				mesIngreso.value
			)} meses cumple el proximo año</h4>`;
			return;
		}

		if (edadEtaria === 'nonato') {
			informe.innerHTML = `<h4>Nonato, sin edad ni es carga familiar</h4>`;
			return;
		}

		if (siCarga.checked) {
			informe.innerHTML = `<h4>La persona es un ${rangoEtario(
				aniosVida
			)}, carga familiar con ${aniosVida} años y ${mesesVida} meses</h4>`;
			return;
		}

		if (noCarga.checked) {
			informe.innerHTML = `<h4>La persona es un ${rangoEtario(
				aniosVida
			)}, no es carga familiar con ${aniosVida} años y ${mesesVida} meses</h4>`;
			return;
		}
	});
});
