const router = require("express").Router();
const authRoutes = require("./auth");

// auth routes
router.use(authRoutes);

module.exports = router;
