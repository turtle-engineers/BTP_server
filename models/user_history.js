const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const UserHistory = sequelize.define('UserHistory', {
        // Model attributes are defined here
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        yyyy: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        mm: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        dd: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        times: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'user_history'
    });
    return UserHistory;
}
