module.exports = function(sequelize, DataTypes){
  let stratching = sequelize.define("Stratching", {
      Title : {
        filed: "title",
        type: DataTypes.STRING(50),
        allowNull: true
      },
      Image : {
        filed: "image",
        type: DataTypes.STRING(100),
        allowNull: true
      },
      Minute: {
        field: "minute",
        type: DataTypes.BIGINT(10),
        allowNull: false
      },
      Difficulty: {
        field: "difficulty",
        type: DataTypes.BIGINT(10),
        allowNull: false
      }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName: "stratching"
  });
  return stratching;
}