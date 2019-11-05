const router = require("express").Router();
const bookRoutes = require("./binance");

// Book routes
router.use("", bookRoutes);

module.exports = router;
