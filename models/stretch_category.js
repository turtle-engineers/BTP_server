module.exports = (sequelize, DataTypes) => {
    return sequelize.define('StretchCategory', {
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
}
