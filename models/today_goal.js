const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const TodayGoal = sequelize.define('TodayGoal', {
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
        },
        finish: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        goaldate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'today_goal'
    });

    TodayGoal.associate = function (models) {
        TodayGoal.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
    }

    return TodayGoal;
}
