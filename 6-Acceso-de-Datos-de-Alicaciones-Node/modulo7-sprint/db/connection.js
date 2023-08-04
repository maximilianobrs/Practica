import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { env } from 'process';

dotenv.config();

const db = new Sequelize(
	env.POSTGRES_DB,
	env.POSTGRES_USER,
	env.POSTGRES_PASSWORD,
	{
		host: env.POSTGRES_HOST,
		dialect: 'postgres',
		logging: false,
	}
);

export default db;
