module.exports = function(sequelize, DataTypes){
  let user_routine = sequelize.define("UserRoutine", {
      UserId: {
        field: "userId",
        type: DataTypes.BIGINT(30),
        allowNull: false
      },
      RoutineId: {
        field: "routineId",
        type: DataTypes.BIGINT(30),
        allowNull: false
      }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName: "user_routine"
  });
  return user_routine;
}