const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const MyRoutineContents = sequelize.define('MyRoutineContents', {
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
        tableName: 'my_routine_contents'
    });

    MyRoutineContents.associate = function (models) {
        MyRoutineContents.belongsTo(models.MyRoutine);
        MyRoutineContents.belongsTo(models.StretchContents);
    }

    return MyRoutineContents;
}
