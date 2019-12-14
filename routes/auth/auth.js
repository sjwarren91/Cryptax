const router = require("express").Router();
const passport = require("passport")

// route for creating a new user
router.route("/signup").post(
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

router.route("/signin").post(
  passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

router.route("/user").get(function (req, res) {
  console.log(req.user)
  if (req.user) {
    res.json({user: req.user})
  } else {
    res.json({user: null})
  }
})

module.exports = router;
