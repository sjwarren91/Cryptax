const router = require("express").Router();
const axios = require("axios");
const crypto = require("crypto");

router.route("/holdings").get((req, res) => {
  console.log(process.env.REACT_APP_SECRET_KEY);
  const timestamp = Date.now();
  const hmac = crypto
    .createHmac("sha256", process.env.REACT_APP_SECRET_KEY)
    .update(`timestamp=${timestamp}`)
    .digest("hex");
  const queryString = `https://api.binance.com//api/v3/account?timestamp=${timestamp}&signature=${hmac}`;

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
