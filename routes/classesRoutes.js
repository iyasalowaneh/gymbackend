const passport = require("passport");

const multer = require("multer");
const {
  classList,
  fetchClass,
  sessionCreat,
} = require("../controllers/classesController");
const { fetchGym } = require("../controllers/gymsController ");

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

router.param("classId", async (req, res, next, classId) => {
  const class2 = await fetchClass(classId, next);
  if (class2) {
    const gym = await fetchGym(class2.gymId, next);
    req.gym = gym;
    req.class2 = class2;

    next();
  } else {
    const err = new Error("class not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", classList);
router.post(
  "/:classId/sessions",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  sessionCreat
);

module.exports = router;
