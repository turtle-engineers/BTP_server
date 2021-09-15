module.exports = function(sequelize, DataTypes){
  let user = sequelize.define("User", {
      Name: {
          filed: "name",
          type: DataTypes.STRING(50),
          allowNull: false
      },
      Prvider : {
        filed: "prvider",
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
      },
      PrviderId : {
        filed: "prviderId",
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
      },
      Password: {
          field: "password",
          type: DataTypes.STRING(30),
          allowNull: true
      },
      UserScore: {
          field: "userScore",
          type: DataTypes.BIGINT(30),
          defaultValue: 0
      }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName: "user"
  });
  return user;
}