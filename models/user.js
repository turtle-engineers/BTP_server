const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        providerId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        picture: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        job: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'user'
    });

    User.associate = function (models) {
        User.hasMany(models.TodayGoal);
        User.hasMany(models.Bookmark);
        User.hasMany(models.MyRoutine);
        User.hasMany(models.StretchNotification);
        User.hasMany(models.BreakNotification);
        User.hasMany(models.PlayLog);
        User.hasMany(models.ServiceLog);
    }

    return User;
}
