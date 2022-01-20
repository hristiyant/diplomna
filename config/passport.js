import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js"
import { mongoSettings } from "../config/keys.js";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = mongoSettings.secretOrKey;

export default passport => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        let response = await User.findById(jwt_payload.id)

        if (response) {
          return done(null, response);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    })
  );
};