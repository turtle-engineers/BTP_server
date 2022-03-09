const models = require("./index.js");

module.exports = (sequelize, DataTypes) => {
  const StretchContents = sequelize.define(
    "StretchContents",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      imageUrl: {
        type: DataTypes.STRING(200),
      },
      videoUrl: {
        type: DataTypes.STRING(200),
      },
      valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      playTime: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      underscored: true, // createdAt -> created_at (model to column name ONLY)
      tableName: "stretch_contents",
    }
  );

  StretchContents.associate = function (models) {
    StretchContents.belongsTo(models.StretchCategory, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    StretchContents.hasMany(models.Bookmark, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    StretchContents.hasMany(models.MyRoutine, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    StretchContents.hasMany(models.PlayLog, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return StretchContents;
};
