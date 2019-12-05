const router = require("express").Router();
const binanceRoutes = require("./binance");

// Book routes
router.use(binanceRoutes);

module.exports = router;
