import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const Usuario = db.define(
	'usuario',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING(50),
			validate: { isAlpha: true },
			allowNull: false,
		},
		balance: {
			type: DataTypes.FLOAT,
			validate: { isFloat: true },
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

export default Usuario;
