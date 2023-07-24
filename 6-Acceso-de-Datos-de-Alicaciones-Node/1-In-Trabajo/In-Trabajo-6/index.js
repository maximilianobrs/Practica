import Sequelize from 'sequelize';
import {DataTypes} from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', '7948', {
    host: 'localhost',
    dialect: 'postgres'
});

const Cliente = sequelize.define("cliente", {
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    rut: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});

const Producto = sequelize.define("producto", {
    nombre: DataTypes.STRING,
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
});

const Cliente_Producto = sequelize.define("cliente_producto", {});

Cliente.belongsToMany(Producto, { through: Cliente_Producto });
Producto.belongsToMany(Cliente, { through: Cliente_Producto });

sequelize.sync()
    .then(() => {
        console.log('Tablas creadas.');
    })
    .catch((error) => {
        console.error('Error al crear las tablas:', error);
    });