const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    name: { type: DataTypes.STRING, allowNull: false },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    availability: DataTypes.BOOLEAN,
  });
  SequelizeSlugify.slugifyModel(Class, { source: ["name"] });

  Class.associate = (models) => {
    models.Gym.hasMany(Class, {
      foreignKey: "gymId",
      as: "classes",
    });
    Class.belongsTo(models.Gym, {
      foreignKey: "gymId",
    });
  };

  return Class;
};
