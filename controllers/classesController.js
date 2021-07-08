const { Class } = require("../db/models");
const { Session } = require("../db/models");
exports.fetchClass = async (classId, next) => {
  try {
    const class2 = await Class.findByPk(classId);

    return class2;
  } catch (error) {
    next(error);
  }
};

exports.classList = async (req, res) => {
  try {
    const classes = await Class.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Session,

        as: "sessions",

        attributes: ["id"],
      },
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.sessionCreat = async (req, res, next) => {
  try {
    if (req.user.id === req.gym.ownerId || req.user.typeOfUser === "admin") {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      }

      req.body.classId = req.class2.id;
      const newSession = await Session.create(req.body);
      res.status(201).json(newSession);
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
