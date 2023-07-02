const deleteGasto = document.querySelectorAll('.deleteGasto');

deleteGasto.forEach((deleteGasto) => {
	deleteGasto.addEventListener('submit', async (e) => {
		e.preventDefault();

		const id = e.target.attributes['data-id'].value;

		if (!id) return alert('Faltan datos');

		Swal.fire({
			title: '¿Estás seguro?',
			text: 'No podrás revertir esta acción',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar',
		}).then(async (result) => {
			if (!result.isConfirmed) return;

			const deletedGasto = await axios.delete(`/gasto`, { data: { id } });

			if (deletedGasto.status === 200) {
				Toast.fire({
					icon: 'success',
					title: 'Eliminando gasto...',
				});
			} else {
				Toast.fire({
					icon: 'error',
					title: 'Error al eliminar gasto',
				});
			}
		});
	});
});
