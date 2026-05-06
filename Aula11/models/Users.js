module.exports = (sequelize, type) => { 
    return sequelize.define('users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        password: { 
            type: type.STRING,
            allowNull: false
        },
        email: { 
            type: type.STRING,
            allowNull: false
        },
        first_name: type.STRING,
        last_name: type.STRING,
        address: type.STRING,
        phone_number: type.STRING
    },{
        tableName: 'users',
        timestamps: true
    });
}