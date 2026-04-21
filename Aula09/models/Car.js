const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Car = sequelize.define('User',{
    Brand: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    Model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LicensePlate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    Color: {
        type: DataTypes.STRING
    },
    Year: {
        type: DataTypes.INTEGER 
    },
    Power: {
        type: DataTypes.INTEGER
    },
    Displacement: {
        type: DataTypes.INTEGER // Cilindrada costuma ser inteiro (ex: 1600)
    }
},{
    tableName: 'cars',
    timestamps: true
});

module.exports = Car;