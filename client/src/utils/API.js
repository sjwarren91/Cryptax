import axios from "axios";

export default {

  getHoldings: () => {
    return axios.get("/api/holdings")
  }, 

  getCoinPrice: (coin) => {
    return axios.get(`/api/currentPrice/${coin}`)
  },

  getTrades: (coin) => {
    return axios.post("/api/trades", { coin: coin })
  },

  getHistoricPrice: (time) => {
    return axios.post("/api/historicPrice", { time: time })
  },

  getKlines: (coin, interval) => {
    return axios.post("/api/klines", { coin: coin, interval: interval })
  },

  getDeposits: (coin) => {
    return axios.post("/api/deposits", { coin: coin })
  },

  getWithdrawals: (coin) => {
    return axios.post("/api/withdrawals", { coin: coin })
  },

  signUp: (data) => {
    return axios.post("/user/signup", {data})
  }
};
