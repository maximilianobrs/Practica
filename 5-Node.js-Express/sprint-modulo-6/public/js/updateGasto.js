const updateGasto = document.querySelectorAll('.updateGasto');

updateGasto.forEach((updateGasto) => {
	updateGasto.addEventListener('submit', async (e) => {
		e.preventDefault();

		const id = e.target.attributes['data-id'].value;

		const gastos = await axios.get('/gastos');
		const arrGastos = await gastos.data;

		const gasto = await arrGastos.find((gasto) => gasto.id === id);

		const roommates = await axios.get('/roommate');
		const arrRoommates = await roommates.data;

		const roommate = await arrRoommates.find(
			(roommate) => roommate.id === gasto.roommate_id
		);

		const { value: formValues } = await Swal.fire({
			title: 'Actualizar gasto',
			showDenyButton: true,
			showCancelButton: true,
			denyButtonText: `Cancelar`,
			confirmButtonText: 'Actualizar',
			html:
				'<input type="hidden" id="roommate_id" value="' +
				roommate.id +
				'">' +
				'<label for="nombreSwal">Roommate</label>' +
				'<input type="text" id="nombreSwal" class="swal2-input" readonly value="' +
				roommate.nombre +
				'">' +
				'<label for="descripcionSwal">Descripción</label>' +
				'<input type="text" id="descripcionSwal" class="swal2-input" placeholder="Descripción" value="' +
				gasto.descripcion +
				'">' +
				'<label for="montoSwal">Monto</label>' +
				'<input type="number" id="montoSwal" class="swal2-input" placeholder="0" value="' +
				gasto.monto +
				'">',
			preConfirm: () => {
				return [
					document.getElementById('roommate_id').value,
					document.getElementById('descripcionSwal').value,
					document.getElementById('montoSwal').value,
				];
			},
		});

		if (formValues) {
			const putGasto = await axios.put('/gasto', {
				id,
				roommate_id: formValues[0],
				descripcion: formValues[1],
				monto: formValues[2],
			});

			if (putGasto.status === 200) {
				Toast.fire({
					icon: 'success',
					title: 'Actualizando gasto...',
				});
			} else {
				Toast.fire({
					icon: 'error',
					title: 'Error al actualizar gasto',
				});
			}
		}
	});
});
