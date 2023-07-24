import Sequelize from 'sequelize';
import {DataTypes} from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', '7948', {
    host: 'localhost',
    dialect: 'postgres'
});

class Rectangulo {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
    calcularArea() {
        return this.x * this.y;
    }
    calcularPerimetro() {
        return (this.x + this.y) * 2;
    }
}

class Triangulo {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
    calcularArea() {
        return (this.x * this.y) / 2;
    }
    calcularPerimetro() {
        let z = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
        return (this.x + this.y + z);
    }
}
class Circulo {
    constructor(r) {
        this.r = r;
    }
    calcularArea() {
        return this.r * this.r * Math.PI;
    }
    calcularPerimetro() {
        return this.r * Math.PI * 2;
    }
}

const ModeloRectangulo = sequelize.define('rectangulo', {
    ladox:{
        type: DataTypes.INTEGER
    },
    ladoy:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

const ModeloTriangulo = sequelize.define('triangulo', {
    ladox:{
        type: DataTypes.INTEGER
    },
    ladoy:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

const ModeloCirculo = sequelize.define('circulo', {
    radio:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

sequelize.sync()
    .then(() => {
        console.log('Tablas creadas.');
    })
    .catch((error) => {
        console.error('Error al crear las tablas:', error);
    });