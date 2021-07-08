const { Session } = require("../db/models");
exports.fetchSession = async (sessionId, next) => {
  try {
    const session = await Session.findByPk(sessionId);

    return session;
  } catch (error) {
    next(error);
  }
};

exports.sessionList = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
