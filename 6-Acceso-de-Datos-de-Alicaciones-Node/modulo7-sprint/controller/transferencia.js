import Transferencia from '../models/Transferencia.js';
import Usuario from '../models/Usuario.js';

export const getTransferencias = async (req, res) => {
	const transferencias = await Transferencia.findAll();
	const usuarios = await Usuario.findAll();

	transferencias.forEach((transferencia) => {
		usuarios.forEach((usuario) => {
			if (transferencia.emisor === usuario.id) {
				transferencia.emisor = usuario.nombre;
			}

			if (transferencia.receptor === usuario.id) {
				transferencia.receptor = usuario.nombre;
			}
		});
	});

	res.status(200).json({ transferencias: transferencias });
};

export const postTransferencia = async (req, res) => {
	const { emisor, receptor, monto } = req.body;

	try {
		// Obtenemos al emisor
		const usuarioEmisor = await Usuario.findOne({
			where: {
				id: emisor,
			},
		});

		// Obtenemos al receptor
		const usuarioReceptor = await Usuario.findOne({
			where: {
				id: receptor,
			},
		});

		// Validamos que existan ambos usuarios
		if (!usuarioEmisor) {
			return res.status(403).json({
				msg: 'No existe el emisor',
			});
		}

		if (!usuarioReceptor) {
			return res.status(403).json({
				msg: 'No existe el receptor',
			});
		}

		// Validamos que el emisor tenga balance suficiente
		if (usuarioEmisor.balance < monto) {
			return res.status(403).json({
				msg: 'No tiene balance suficiente',
			});
		}

		// Actualizamos el balance del emisor
		usuarioEmisor.balance = Number(usuarioEmisor.balance) - Number(monto);
		const emisorActualizado = await usuarioEmisor.save();

		// Actualizamos el balance del receptor
		usuarioReceptor.balance = Number(usuarioReceptor.balance) + Number(monto);
		const receptorActualizado = await usuarioReceptor.save();

		// Guardamos la transferencia
		const transferencia = new Transferencia({ emisor, receptor, monto });
		await transferencia.save();

		res.status(201).json(transferencia);
	} catch (error) {
		res.status(500).json({
			msg: `${error}`,
		});
	}
};
