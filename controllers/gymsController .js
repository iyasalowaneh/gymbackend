const { Gym } = require("../db/models");
const { Class } = require("../db/models");

exports.fetchGym = async (gymId, next) => {
  try {
    const gym = await Gym.findByPk(gymId);
    return gym;
  } catch (error) {
    next(error);
  }
};

exports.gymCreat = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    console.log("here");
    console.log(req.user);

    req.body.ownerId = req.user.id;
    console.log(req.user);
    const newGym = await Gym.create(req.body);
    res.status(201).json(newGym);
  } catch (error) {
    next(error);
  }
};
exports.classCreat = async (req, res, next) => {
  try {
    if (req.user.id === req.gym.ownerId || req.user.typeOfUser === "admin") {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      }

      req.body.gymId = req.gym.id;
      const newClass = await Class.create(req.body);
      res.status(201).json(newClass);
    } else {
      next({
        status: 401,
        message: "you can not create a class, the gym is not yours",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.gymList = async (req, res, next) => {
  try {
    const gyms = await Gym.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Class,

        as: "classes",

        attributes: ["id"],
      },
    });
    res.json(gyms);
  } catch (error) {
    next(error);
  }
};
