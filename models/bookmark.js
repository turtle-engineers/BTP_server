const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
    const Bookmark = sequelize.define('Bookmark', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    }, {
        // Other model options go here
        underscored: true,  // createdAt -> created_at (model to column name ONLY)
        tableName: 'bookmark'
    });

    Bookmark.associate = function (models) {
        Bookmark.belongsTo(models.User);
        Bookmark.belongsTo(models.StretchContents);
    }

    return Bookmark;
}
