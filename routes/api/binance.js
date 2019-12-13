const router = require("express").Router();
const axios = require("axios");
const crypto = require("crypto");

router.route("/holdings").get((req, res) => {
  // console.log(process.env.REACT_APP_SECRET_KEY)
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
      // console.log(err);
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
  // console.log(queryString);
  axios
    .get(queryString)
    .then(data => res.json(data.data))
    .catch(err => res.json(err));
});

router.route("/historicPrice").post((req, res) => {
  let queryString = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1&startTime=${req.body.time}`;
  axios
    .get(queryString)
    .then(data => res.json(data.data))
    .catch(err => res.json(err));
});

router.route("/klines").post((req, res) => {
  let queryString = `https://api.binance.com/api/v3/klines?symbol=${req.body.coin}&interval=${req.body.interval}&limit=40`;
  axios
    .get(queryString)
    .then(data => res.json(data.data))
    .catch(err => res.json(err));
});

router.route("/trades").post((req, res) => {
  const timestamp = Date.now();
  const hmac = crypto
    .createHmac("sha256", process.env.REACT_APP_SECRET_KEY)
    .update(`symbol=${req.body.coin}BTC&timestamp=${timestamp}`)
    .digest("hex");
  // console.log(req.body);
  let queryString = `https://api.binance.com/api/v3/myTrades?symbol=${req.body.coin}BTC&timestamp=${timestamp}&signature=${hmac}`;
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
      // console.log(err);
      res.json(err);
    });
});

router.route("/deposits").post((req, res) => {
  const timestamp = Date.now();
  const hmac = crypto
    .createHmac("sha256", process.env.REACT_APP_SECRET_KEY)
    .update(`asset=${req.body.coin}&timestamp=${timestamp}`)
    .digest("hex");
  let queryString = `https://api.binance.com/wapi/v3/depositHistory.html?asset=${req.body.coin}&timestamp=${timestamp}&signature=${hmac}`;
  axios.get(queryString, {
    headers: {
      "X-MBX-APIKEY": process.env.REACT_APP_API_KEY
    }
  }).then(data => {
    // console.log(data.data)
    res.json(data.data)
  }).catch(err => {
    // console.log(err);
    res.json(err);
  });
});

router.route("/withdrawals").post((req, res) => {
  const timestamp = Date.now();
  const hmac = crypto
    .createHmac("sha256", process.env.REACT_APP_SECRET_KEY)
    .update(`asset=${req.body.coin}&timestamp=${timestamp}`)
    .digest("hex");
  let queryString = `https://api.binance.com/wapi/v3/withdrawHistory.html?asset=${req.body.coin}&timestamp=${timestamp}&signature=${hmac}`;
  axios.get(queryString, {
    headers: {
      "X-MBX-APIKEY": process.env.REACT_APP_API_KEY
    }
  }).then(data => {
    // console.log(data.data)
    res.json(data.data)
  }).catch(err => {
    // console.log(err);
    res.json(err);
  });
});

module.exports = router;
