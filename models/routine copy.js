module.exports = function(sequelize, DataTypes){
  let routine = sequelize.define("Routine", {
      RoutineId: {
        field: "routineId",
        type: DataTypes.BIGINT(30),
        allowNull: false
      },
      Title : {
        filed: "title",
        type: DataTypes.STRING(50),
        allowNull: true
      }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName: "routine"
  });
  return routine;
}