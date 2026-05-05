const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book',{
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publication_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    available_copies: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1
    }
},{
    tableName: 'books',
    timestamps: true
});
 
module.exports = Book;