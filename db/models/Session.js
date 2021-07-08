const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    isFull: { type: DataTypes.BOOLEAN, defaultValue: true },
    coachName: DataTypes.STRING,
  });
  SequelizeSlugify.slugifyModel(Session, { source: ["name"] });

  Session.associate = (models) => {
    models.Class.hasMany(Session, {
      foreignKey: "classId",
      as: "sessions",
    });
    Session.belongsTo(models.Class, {
      foreignKey: "classId",
    });
  };

  return Session;
};
