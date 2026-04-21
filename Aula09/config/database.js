const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('ficha9', 'root','root',{
    host: 'localhost', dialect: 'mysql' 
});

module.exports = sequelize;