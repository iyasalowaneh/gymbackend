const passport = require("passport");
const multer = require("multer");
const {
  gymCreat,
  gymList,
  fetchGym,
  classCreat,
} = require("../controllers/gymsController ");
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

router.param("gymId", async (req, res, next, gymId) => {
  const gym = await fetchGym(gymId, next);
  if (gym) {
    req.gym = gym;

    next();
  } else {
    const err = new Error("gym not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", gymList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  gymCreat
);

router.post(
  "/:gymId/classes",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  classCreat
);

module.exports = router;
