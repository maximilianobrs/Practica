const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'dbname',
});

const { DataTypes } = require('sequelize');

const Rectangulo = sequelize.define('rectangulo', {
  ladox: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ladoy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sincronizar el modelo con la base de datos
async function sincronizar() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos.');

    await Rectangulo.sync({ force: true }); // Usamos { force: true } para recrear la tabla cada vez que se sincronice
    console.log('Tabla Rectangulo creada.');

    sequelize.close();
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}

sincronizar();
