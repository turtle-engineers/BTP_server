const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const StretchCategory = sequelize.define('StretchCategory', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        valid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'stretch_category'
    });

    StretchCategory.associate = function (models) {
        StretchCategory.hasMany(models.StretchContents, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        });
    }

    return StretchCategory;
}
