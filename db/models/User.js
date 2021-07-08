const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    typeOfUser: { type: DataTypes.STRING, defaultValue: "member" },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    typeOfUser: DataTypes.STRING,
  });
  SequelizeSlugify.slugifyModel(User, { source: ["name"] });

  User.associate = (models) => {
    User.hasMany(models.Gym, {
      foreignKey: "ownerId",
      as: "users",
    });
    models.Gym.belongsTo(User, {
      foreignKey: "ownerId",
    });
  };

  return User;
};
