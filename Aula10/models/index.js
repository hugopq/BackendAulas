const sequelize = require('../config/database');
const Book = require('./Book');
const User = require('./User');
const Loan = require('./Loan');

Loan.belongsTo(Book, { foreignKey: 'book_id', 
    as: 'book' });
Book.hasMany(Loan, { foreignKey: 'book_id', 
    as: 'loans'});

Loan.belongsTo(User, { foreignKey: 'user_id', 
    as: 'user' });
User.hasMany(Loan, { foreignKey: 'user_id', 
    as: 'loans' });

module.exports = {sequelize, Book, User, Loan }