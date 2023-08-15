import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('postgres','postgres','7948',{
    host:'localhost',
    dialect:'postgres'
});

export default sequelize;