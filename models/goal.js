const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const Goal = sequelize.define('Goal', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'goal'
    });

    Goal.associate = function (models) {
        Goal.hasMany(models.TodayGoal, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
    };

    return Goal;
}
