const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const BreakNotification = sequelize.define('BreakNotification', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        repeatTime: {
            type: DataTypes.STRING(4),
            allowNull: false
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'break_notification'
    });

    BreakNotification.associate = function (models) {
        BreakNotification.belongsTo(models.User);
    }

    return BreakNotification;
}
