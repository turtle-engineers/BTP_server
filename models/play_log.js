const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const PlayLog = sequelize.define('PlayLog', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        finalPlayTime: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        finish: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'play_log'
    });

    PlayLog.associate = function (models) {
        PlayLog.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        PlayLog.belongsTo(models.StretchContents, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
    }

    return PlayLog;
}
