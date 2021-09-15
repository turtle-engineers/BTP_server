module.exports = function(sequelize, DataTypes){
  let user_mission = sequelize.define("UserMission", {
      UserId: {
        field: "userId",
        type: DataTypes.BIGINT(30),
        allowNull: false
      },
      MissionId: {
        field: "missionId",
        type: DataTypes.BIGINT(30),
        allowNull: false
      },
      Complete: {
          filed: "complete",
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName: "user_mission"
  });
  return user_mission;
}