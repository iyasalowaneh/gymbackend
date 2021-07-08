const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define("Gym", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: DataTypes.STRING,
  });
  SequelizeSlugify.slugifyModel(Gym, { source: ["name"] });

  //   Gym.associate = (models) => {
  //     models.User.hasMany(Gym, {
  //       foreignKey: "userId",
  //       as: "gyms",
  //     });
  //     Gym.belongsTo(models.User, {
  //       foreignKey: "userId",
  //     });
  //   };

  return Gym;
};
