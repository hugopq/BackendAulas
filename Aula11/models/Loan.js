module.exports = (sequelize, type) => { 
    return sequelize.define('loans', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: type.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        book_id:{
            type: type.INTEGER,
            references: {
                model: 'books',
                key: 'id'
            }
        },
        loan_date:{
            type: type.DATE,
            allowNull:false,
        },
        return_date:{
            type: type.DATE,
            allowNull:true,
        }
    },{
        tableName: 'loans',
        timestamps: true
    });
}