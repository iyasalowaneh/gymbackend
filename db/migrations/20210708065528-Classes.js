"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Classes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: { type: Sequelize.STRING, allowNull: false },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 25,
        validate: {
          min: 20,
        },
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
      },
      image: Sequelize.STRING,
      type: Sequelize.STRING,

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Classes");
  },
};
