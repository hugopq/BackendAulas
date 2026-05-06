module.exports = (sequelize, type) => { 
    return sequelize.define('books', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        author_name: {
            type: type.STRING,
            allowNull: false
        },
        publication_date: {
            type: type.DATE,
            allowNull: false
        },
        genre: {
            type: type.STRING,
            allowNull: false
        },
        available_copies: {
            type: type.STRING,
            allowNull: false,
            defaultValue: 1
        }
    },{
        tableName: 'books',
        timestamps: true
    });
}