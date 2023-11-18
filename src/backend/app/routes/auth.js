const express = require("express");
const router = express.Router();
const passport = require("../strategy/jwtStrategy");
const { signup, signin } = require("../controllers/auth");

router.post("/signup", signup);

router.post("/signin", signin);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    return res.status(200).send(req.user);
  }
);

module.exports = router;
