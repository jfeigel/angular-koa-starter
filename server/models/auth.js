const passport = require('../index.js').passport;
const userModel = require('./user');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async(username, password, done) => {
  // Get the user
  const user = await userModel.get(username);
  if (user.error === true) {
    // The user doesn't exist
    return done(null, false);
  }

  const match = await bcrypt.compare(password, user.password);
  if (match !== true) {
    return done(null, false);
  }

  return done(null, user);
}));
