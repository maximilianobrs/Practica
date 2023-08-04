import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const Transferencia = db.define(
	'transferencia',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		emisor: {
			type: DataTypes.INTEGER,
			validate: { isNumeric: true },
			allowNull: false,
		},
		receptor: {
			type: DataTypes.INTEGER,
			validate: { isNumeric: true },
			allowNull: false,
		},
		monto: {
			type: DataTypes.FLOAT,
			validate: { isFloat: true, min: 0 },
			allowNull: false,
		},
		fecha: {
			type: DataTypes.DATE,
			validate: { isDate: true },
			defaultValue: DataTypes.NOW,
		},
	},
	{
		timestamps: false,
	}
);

export default Transferencia;
