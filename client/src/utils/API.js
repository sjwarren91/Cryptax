import axios from "axios";
const crypto = require("crypto");

export default {
  getCoinTrades: coin => {
    const timestamp = Date.now();
    const hmac = crypto
      .createHmac("sha256", process.env.REACT_APP_SECRET_KEY)
      .update(`symbol=${coin}&timestamp=${timestamp}`)
      .digest("hex");

    const queryString = `https://api.binance.com/api/v3/allOrders?symbol=${coin}&timestamp=${timestamp}&signature=${hmac}`;
    return axios.get(queryString, {
      headers: {
        "X-MBX-APIKEY": process.env.REACT_APP_API_KEY
      }
    });
  },

  getHoldings: () => {
    return axios.get("/api/holdings")
  }
};
