const router = require("express").Router();
const passport = require("passport")

// route for creating a new user
router.route("/signup").post(
  passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/"
  })
);

module.exports = router;
