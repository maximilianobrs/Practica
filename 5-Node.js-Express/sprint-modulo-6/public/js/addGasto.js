const addGasto = document.querySelector('#addGasto');

addGasto.addEventListener('submit', async (e) => {
	e.preventDefault();

	const roommate_id = document.querySelector('#roommate_id').value;
	const descripcion = document.querySelector('#descripcion').value;
	const monto = document.querySelector('#monto').value;

	if (!roommate_id || !descripcion || !monto) return alert('Faltan datos');

	const gasto = {
		roommate_id,
		descripcion,
		monto,
	};

	const addedGasto = await axios.post('/gasto', gasto);

	console.log(addedGasto.status);

	if (addedGasto.status === 201) {
		Toast.fire({
			title: 'Agregando gasto...',
			icon: 'success',
		});
	} else {
		Toast.fire({
			title: 'Error al agregar gasto',
			icon: 'error',
		});
	}
});
