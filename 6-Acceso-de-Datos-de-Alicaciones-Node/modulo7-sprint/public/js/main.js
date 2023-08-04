const URL = 'http://localhost:8000/api';

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
		toast.addEventListener('click', Swal.close);
	},
});

document.addEventListener('DOMContentLoaded', () => {
	const formUsuario = document.querySelector('#formUsuario');
	const formTransferencia = document.querySelector('#formTransferencia');

	formUsuario.addEventListener('submit', async (e) => {
		e.preventDefault();

		try {
			const nombre = document.querySelector('#nombreUsuario').value;
			const balance = document.querySelector('#balanceUsuario').value;

			const data = {
				nombre,
				balance,
			};

			const res = await axios.post(`${URL}/usuario`, data, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.status === 201) {
				Toast.fire({
					icon: 'success',
					title: 'Usuario creado',
				});
			}

			if (res.status === 500) {
				Toast.fire({
					icon: 'error',
					title: 'Error en el servidor',
				});
			}

			await reload();
		} catch (error) {
			console.log(error);

			Toast.fire({
				icon: 'error',
				title: 'Error al crear el usuario',
			});
		}
	});

	formTransferencia.addEventListener('submit', async (e) => {
		e.preventDefault();

		try {
			const emisor = document.querySelector('#emisor').value;
			const receptor = document.querySelector('#receptor').value;
			const monto = document.querySelector('#monto').value;

			const data = {
				emisor,
				receptor,
				monto,
			};

			const res = await axios.post(`${URL}/transferencia`, data, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.status === 201) {
				Toast.fire({
					icon: 'success',
					title: 'Transferencia creada',
				});
			}

			if (res.status === 403) {
				Toast.fire({
					icon: 'error',
					title: 'No se puede realizar la transferencia',
				});
			}

			if (res.status === 500) {
				Toast.fire({
					icon: 'error',
					title: 'Error en el servidor',
				});
			}

			await reload();
		} catch (err) {
			Toast.fire({
				icon: 'error',
				title: 'Error al crear la transferencia',
			});
		}
	});

	const getUsuarios = async () => {
		try {
			const { data } = await axios(`${URL}/usuario`);

			return data;
		} catch (error) {
			Toast.fire({
				icon: 'error',
				title: 'Error al obtener los usuarios',
			});
		}
	};

	const getUsuariosOpciones = async () => {
		try {
			const data = await getUsuarios();
			const usuarios = data.usuarios.map((usuario) => {
				return `<option value="${usuario.id}">${usuario.nombre}</option>`;
			});

			document.querySelector('#emisor').innerHTML = usuarios.join('');
			document.querySelector('#receptor').innerHTML = usuarios.join('');
		} catch (err) {
			Toast.fire({
				icon: 'error',
				title: 'Error al cargar los usuarios',
			});
		}
	};

	const getUsuariosTabla = async () => {
		try {
			const data = await getUsuarios();
			const usuarios = data.usuarios.map((usuario) => {
				return `<tr>
								<td>${usuario.nombre}</td>
								<td>${usuario.balance}</td>
						</tr>`;
			});

			document.querySelector('.usuarios').innerHTML = usuarios.join('');
		} catch (err) {
			Toast.fire({
				icon: 'error',
				title: 'Error al cargar los usuarios',
			});
		}
	};

	const transferenciasTabla = async () => {
		try {
			const { data } = await axios(`${URL}/transferencia`);

			const transferencias = data.transferencias.map((transferencia) => {
				return `<tr>
								<td>${moment(transferencia.fecha).format('DD/MM/YYYY - hh:mm')}</td>
								<td>${transferencia.emisor}</td>
								<td>${transferencia.receptor}</td>
								<td>${transferencia.monto}</td>
						</tr>`;
			});

			document.querySelector('.transferencias').innerHTML =
				transferencias.join('');
		} catch (err) {
			Toast.fire({
				icon: 'error',
				title: 'Error al cargar las transferencias',
			});
		}
	};

	const reload = async () => {
		await getUsuariosTabla();
		await getUsuariosOpciones();
		await transferenciasTabla();
	};

	reload();
});
