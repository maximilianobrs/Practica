import {DataTypes} from 'sequelize';
import { sequelize } from "../db/database.js";

export const ModeloRectangulo = sequelize.define('rectangulo', {
    ladox:{
        type: DataTypes.INTEGER
    },
    ladoy:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

export const ModeloTriangulo = sequelize.define('triangulo', {
    ladox:{
        type: DataTypes.INTEGER
    },
    ladoy:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

export const ModeloCirculo = sequelize.define('circulo', {
    radio:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});