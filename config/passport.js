const bcrypt = require("bcryptjs");
const db = require("../models");

module.exports = function(passport) {
  let LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },

      function(req, username, password, done) {
        var generateHash = password => {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        db.User.findOne({
          username: username
        }).then(user => {
          if (user) {
            return done(null, false, {
              message: "That username is already taken"
            });
          } else {
            let userPassword = generateHash(password);
            let data = {
              username: username,
              password: userPassword
            };

            db.User.create(data).then(newUser => {
                if (!newUser) {
                    return done(null, false)
                } else {
                    return done(null, newUser)
                }

                
            })
          }
        });
      }
    )
  );
};
