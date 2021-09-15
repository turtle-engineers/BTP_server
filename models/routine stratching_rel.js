module.exports = function(sequelize, DataTypes){
  let routine_stratching_rel = sequelize.define("RoutineStratchingRel", {
      RoutineId: {
        field: "routineId",
        type: DataTypes.BIGINT(30),
        allowNull: false
      },
      StratchingId: {
        field: "StratchingId",
        type: DataTypes.BIGINT(30),
        allowNull: false
      }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName: "routine_stratching_rel"
  });
  return routine_stratching_rel;
}