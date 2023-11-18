const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTPRIVATEKEY,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      console.log("jwt_payload", jwt_payload);
      let user = await User.findOne({ _id: jwt_payload._id }, { __v: 0 });
      user.password = undefined;
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.error(err);
      return done(err, false); // return error in case any
    }
  })
);
module.exports = passport;
