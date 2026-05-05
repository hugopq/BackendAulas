const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Loan = sequelize.define('Loan',{
    loan_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    book_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'books',
            key: 'book_id'
        }
    },
    loan_date:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    return_date:{
        type: DataTypes.DATE,
        allowNull:true,
    }
},{
    tableName: 'loans',
    timestamps: true
});
 
module.exports = Loan;