const router = require("express").Router();
const axios = require("axios");
const crypto = require("crypto");

router.route("/holdings").get((req, res) => {
  const timestamp = Date.now();
  const hmac = crypto
    .createHmac("sha256", process.env.REACT_APP_SECRET_KEY)
    .update(`timestamp=${timestamp}`)
    .digest("hex");
  const queryString = `https://api.binance.com/api/v3/account?timestamp=${timestamp}&signature=${hmac}`;

  axios
    .get(queryString, {
      headers: {
        "X-MBX-APIKEY": process.env.REACT_APP_API_KEY
      }
    })
    .then(data => {
      res.json(data.data);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

router.route("/currentPrice/:coin").get((req, res) => {
  let queryString = "";
  if (req.params.coin === "BTC") {
    queryString = "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT";
  } else {
    queryString = `https://api.binance.com/api/v3/avgPrice?symbol=${req.params.coin}BTC`;
  }
  console.log(queryString);
  axios
    .get(queryString)
    .then(data => res.json(data.data))
    .catch(err => res.json(err));
});

router.route("/trades").post((req, res) => {
  const timestamp = Date.now();
  const hmac = crypto
    .createHmac("sha256", process.env.REACT_APP_SECRET_KEY)
    .update(`symbol=NEBLBTC&timestamp=${timestamp}`)
    .digest("hex");

  let queryString = `https://api.binance.com/api/v3/myTrades?symbol=NEBLBTC&timestamp=${timestamp}&signature=${hmac}`;
  axios
    .get(queryString, {
      headers: {
        "X-MBX-APIKEY": process.env.REACT_APP_API_KEY
      }
    })
    .then(data => {
      res.json(data.data);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
