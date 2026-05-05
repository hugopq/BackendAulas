const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User',{
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    address:{
        type: DataTypes.STRING,
    },
    phone_number:{
        type: DataTypes.STRING,
    }
},{
    tableName: 'users',
    timestamps: true
});
 
module.exports = User;