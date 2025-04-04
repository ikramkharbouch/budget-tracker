const passport = require('passport');
// const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
// const { Strategy: AppleStrategy } = require('passport-apple');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('./server/models'); // Sequelize User model
const dotenv = require('dotenv');

dotenv.config();

// Local Strategy (email/password)
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return done(null, false, { message: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// // Google OAuth Strategy
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:5000/auth/google/callback',
// },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ where: { googleId: profile.id } });

//       if (!user) {
//         user = await User.create({
//           googleId: profile.id,
//           name: profile.displayName,
//           email: profile.emails?.[0]?.value,
//         });
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err, null);
//     }
//   }
// ));

// // Apple OAuth Strategy
// passport.use(new AppleStrategy({
//   clientID: process.env.APPLE_CLIENT_ID,
//   teamID: process.env.APPLE_TEAM_ID,
//   keyID: process.env.APPLE_KEY_ID,
//   privateKey: process.env.APPLE_PRIVATE_KEY,
//   callbackURL: 'http://localhost:5000/auth/apple/callback',
// },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ where: { appleId: profile.id } });

//       if (!user) {
//         user = await User.create({
//           appleId: profile.id,
//           name: profile.fullName?.givenName,
//           email: profile.email,
//         });
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err, null);
//     }
//   }
// ));

// Serialize and Deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
