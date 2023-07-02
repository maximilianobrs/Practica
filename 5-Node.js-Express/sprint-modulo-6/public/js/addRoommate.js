const addRoommate = document.querySelector('#addRoommate');

addRoommate.addEventListener('submit', async (e) => {
	e.preventDefault();

	const addedRoommate = await axios.post('/roommate');

	if (addedRoommate.status === 201) {
		Toast.fire({
			title: 'Agregando roommate...',
			icon: 'success',
		});
	} else {
		Toast.fire({
			title: 'Error al agregar roommate',
			icon: 'error',
		});
	}
});
