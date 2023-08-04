import Usuario from '../models/Usuario.js';
import Transferencia from '../models/Transferencia.js';

Transferencia.belongsTo(Usuario, {
	foreignKey: 'emisor',
	foreignKey: 'receptor',
});

Usuario.hasMany(Transferencia, {
	foreignKey: 'emisor',
	foreignKey: 'receptor',
});

export const getUsuarios = async (req, res) => {
	const usuarios = await Usuario.findAll();

	res.json({ usuarios: usuarios });
};

export const getUsuario = async (req, res) => {
	const { id } = req.params;

	const usuario = await Usuario.findOne({
		where: {
			id: id,
		},
		include: { all: true },
	});
	res.json(usuario);
};

export const postUsuario = async (req, res) => {
	const { body } = req;

	try {
		const usuario = new Usuario(body);
		await usuario.save();

		res.status(201).json(usuario);
	} catch (err) {
		res.status(500).json({ error: 'Error al crear el usuario', msg: err });
	}
};

export const putUsuario = async (req, res) => {
	const { id } = req.params;
	const { body } = req;

	try {
		const usuarioExiste = await Usuario.findOne({
			where: {
				id: id,
			},
		});

		if (!usuarioExiste) {
			return res.status(400).json({
				msg: `No existe el id del usuario ${body.id}`,
			});
		}

		usuarioExiste.nombre = body.nombre;
		usuarioExiste.balance = body.balance;

		const usuario = await usuarioExiste.save();

		res.json(usuario);
	} catch (error) {
		res.status(500).json({
			msg: `${error}`,
		});
	}
};

export const deleteUsuario = async (req, res) => {
	const { body } = req;
	const { id } = req.params;

	try {
		const usuarioExiste = await Usuario.findOne({
			where: {
				id,
			},
		});

		if (!usuarioExiste) {
			return res.status(400).json({
				msg: `No existe el id del usuario ${body.id}`,
			});
		}

		await usuarioExiste.destroy();

		res.json({ msg: 'Usuario eliminado' });
	} catch (error) {
		res.status(500).json({
			msg: `${error}`,
		});
	}
};
