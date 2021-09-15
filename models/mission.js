module.exports = function(sequelize, DataTypes){
  let mission = sequelize.define("Mission", {
      MissionId: {
        field: "missionId",
        type: DataTypes.BIGINT(30),
        allowNull: false
      },
      Title : {
        filed: "title",
        type: DataTypes.STRING(50),
        allowNull: true
      },
      Contents : {
        filed: "contents",
        type: DataTypes.STRING(200),
        allowNull: true
      }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName: "user_mission"
  });
  return mission;
}