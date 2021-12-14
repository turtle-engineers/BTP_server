const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const MyRoutine = sequelize.define('MyRoutine', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        repeatCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contentsOrder: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'my_routine'
    });

    MyRoutine.associate = function (models) {
        MyRoutine.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
        MyRoutine.belongsTo(models.StretchContents, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
    }

    return MyRoutine;
}
