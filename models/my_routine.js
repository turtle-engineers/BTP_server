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
        title: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'my_routine'
    });

    MyRoutine.associate = function (models) {
        MyRoutine.belongsTo(models.User);
        MyRoutine.hasMany(models.MyRoutineContents);
    }

    return MyRoutine;
}
