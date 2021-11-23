module.exports = function(sequelize, DataTypes){
  let user = sequelize.define("User", {
      Provider : {
        filed: "provider",
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false
      },
      ProviderId : {
        filed: "providerId",
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
      },
      Picture: {
        filed: "picture",
        type: DataTypes.STRING(100),
        allowNull: false
      },
      NickName: {
          filed: "nickName",
          type: DataTypes.STRING(10),
          allowNull: false
      },
      Age: {
        filed: "age",
        type: DataTypes.BIGINT(3),
        allowNull: true
      },
      Job: {
        filed: "job",
        type: DataTypes.STRING(10),
        allowNull: true
      },
      Level: {
        filed: "level",
        type: DataTypes.BIGINT(3),
        allowNull: false,
        defaultValue: 0
      },
      Point: {
        filed: "point",
        type: DataTypes.BIGINT(5),
        allowNull: false,
        defaultValue: 0
      }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName: "user"
  });
  return user;
}