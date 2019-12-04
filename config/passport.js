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
                return done(null, false);
              } else {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  //signup strategy
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },

      function(req, username, password, done) {
        var isValidPassword = function(userpass, password) {
          return crypt.compareSync(password, userpass);
        };

        db.findOne({
          username: username
        })
          .then(user => {
            if (!user) {
              return done(null, false, {
                message: "Username doesn't exist."
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Invalid password."
              });
            }

            var userInfo = user.get();
            return done(null, userInfo);
          })
          .catch(err => {
            console.log(`Error: ${err}`);
            return done(null, false, {
              message: "Something went wrong with your sign-in"
            });
          });
      }
    )
  );

  //serialize instance
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  //deserialize instance
  passport.deserializeUser((id, done) => {
    db.User.findById(id).then(user => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
