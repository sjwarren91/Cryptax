const axios = require("axios");
require("dotenv").config();
const crypto = require("crypto");

module.exports = app => {
  app.get("/CGT", (req, res) => {
    const timestamp = Date.now();
    console.log(process.env.KEY);
    // const hmac = crypto
    //   .createHmac("sha256", process.env.KEY)
    //   .update("timestamp=" + timestamp)
    //   .digest("hex");

    const hmac = crypto
      .createHmac("sha256", process.env.KEY)
      .update("symbol=NEBLBTC&timestamp=" + timestamp)
      .digest("hex");

    const queryString = "https://api.binance.com/api/v3/allOrders?" +
      "symbol=NEBLBTC" +
      "&timestamp=" +
      timestamp +
      "&signature=" +
      hmac;

    // const queryString =
    //   "https://api.binance.com//api/v3/account?" +
    //   "timestamp=" +
    //   timestamp +
    //   "&signature=" +
    //   hmac;

    axios
      .get(queryString, {
        headers: {
          "X-MBX-APIKEY": process.env.API
        }
      })
      .then(data => {
        // let array = data.data.balances.filter(coin => {
        //     if(coin.free > 0) {
        //         return coin
        //     }
        // });
        // console.log(array);
        // console.log(data.data);
        let array = data.data.map(coin => {
            return new Date(coin.time)
        })

        console.log(array);

      })
      .catch(err => {
        console.error(err);
      });
  });
};
