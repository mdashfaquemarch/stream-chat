import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from 'passport';
import User from '../models/user.model.js'
import { Config } from "./server-config.js";

passport.use(new GoogleStrategy({
  clientID: Config.GOOGLE_CLIENT_ID,
  clientSecret: Config.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  async (googleAccessToken, googleRefreshToken, profile, done) => {
    // console.log(profile)
    try {

      let user = await User.findOne({ email: profile._json.email });


      if (!user) {
        user = await User.create({
          name: profile._json.name,
          email: profile._json.email,
        })
      }

      const accessToken = await user.generateAccessToken(user);
      
      await user.save();
      return done(null, { user, accessToken })
    } catch (error) {
      return done(error)
    }
  }
));