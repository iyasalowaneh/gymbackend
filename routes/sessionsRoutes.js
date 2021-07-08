const passport = require("passport");

const multer = require("multer");
const {
  sessionList,
  fetchSession,
} = require("../controllers/sessionsController");

const express = require("express");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("sessionId", async (req, res, next, sessionId) => {
  const session = await fetchSession(sessionId, next);
  if (session) {
    const class2 = await fetchClass(session.classId, next);
    req.class2 = class2;
    req.session = session;

    next();
  } else {
    const err = new Error("session not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", sessionList);

module.exports = router;
