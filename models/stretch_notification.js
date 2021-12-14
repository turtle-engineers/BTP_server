const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const StretchNotification = sequelize.define('StretchNotification', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        startTime: {
            type: DataTypes.STRING(4),
            allowNull: true
        },
        endTime: {
            type: DataTypes.STRING(4),
            allowNull: true
        },
        repeatTime: {
            type: DataTypes.STRING(4),
            allowNull: true
        },
        repeatCount: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'stretch_notification'
    });

    StretchNotification.associate = function (models) {
        StretchNotification.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
    }

    return StretchNotification;
}
