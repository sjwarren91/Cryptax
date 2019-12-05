const router = require("express").Router();

// route for creating a new user
router.route("/signup").post((req, res) => {
  res.json(req.body);
});

module.exports = router;
