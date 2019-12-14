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
        console.log(req.body)
        console.log("here");
        var generateHash = (password) => {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        db.User.findOne({
          username: req.body.username
        }).then(user => {
          if (user) {
            return done(null, false, {
              message: "That username is already taken"
            });
          } else {
            let userPassword = generateHash(req.body.password);
            let data = {
              username: req.body.username,
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
        }).catch(err => {
          console.log(`Error: ${err}`)
          return done(null, false, {
            message: "Something went wrong with your sign-up"
          });
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
          return bcrypt.compareSync(password, userpass);
        };

        db.User.findOne({
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
            console.log("Passport\n" , user);
            // var userInfo = user.get();
            return done(null, user);
          })
          .catch(err => {
            console.log(err)
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
  passport.deserializeUser((_id, done) => {
    db.User.findById(_id).then(user => {
      if (user) {
        done(null, user);
      } else {
        done(user.errors, null);
      }
    });
  });
};
