const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const ServiceLog = sequelize.define('ServiceLog', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        pageId: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        apiId: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        contents: {
            type: DataTypes.STRING(40),
            allowNull: false
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'service_log'
    });

    ServiceLog.associate = function (models) {
        ServiceLog.belongsTo(models.User);
    }

    return ServiceLog;
}
