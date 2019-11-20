import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";

class Tax extends Component {
  state = {
    holdings: [],
    profit: 0
  };

  componentDidMount = () => {
    this.getHoldings();
  };

  getCombinedTrades = async () => {
    let data = await Promise.all(
      this.state.holdings.map(coin => {
        return this.getCoinTrades(coin.asset);
      })
    );
    let profitSum = 0;
    for (const profit of data) {
      if (profit) {
        profitSum += profit;
      }
    }
    this.setState({
      profit: this.formatMoney(profitSum)
    });

    console.log(this.state.profit);
  };

  getHoldings = () => {
    API.getHoldings()
      .then(res => {
        const filtered = res.data.balances
          .filter(coin => coin.free > 0);
        console.log(filtered);
        this.setState({
          holdings: filtered
        });
        this.getCombinedTrades();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getCoinTrades = coin => {
    return API.getTrades(coin)
      .then(data => {
        if (data.data.length > 0) {
          return Promise.all(
            data.data.map(element => {
              return API.getHistoricPrice(element.time).then(data => {
                element.price = element.price * data.data[0][3];
                element.quoteQty = element.quoteQty * data.data[0][3];
              });
            })
          )
            .then(() => {
              let array = data.data.map(element => {
                return {
                  ...element,
                  qty: parseFloat(element.qty)
                };
              });

              let buys = array.filter(element => {
                return element.isBuyer;
              });

              let sells = array.filter(element => {
                return !element.isBuyer;
              });

              let totalProfit = 0;

              for (const currentBuy of buys) {
                for (const currentSell of sells) {
                  let profit = 0;
                  if (currentSell.time < currentBuy.time) {
                    //if buy time isnt before sell time => check next sell event
                    continue;
                  } else if (currentSell.qty === 0) {
                    // if current sell quantity = 0 => check next sell event
                    continue;
                  } else if (currentBuy.qty <= currentSell.qty) {
                    // if current buy quantity is less than or equal to current seel quantity
                    // calc profit and update sells/buys
                    profit =
                      currentBuy.qty * currentSell.price - currentBuy.quoteQty;
                    currentSell.qty -= currentBuy.qty;

                    totalProfit += profit;
                    break;
                  } else if (currentBuy.qty > currentSell.qty) {
                    profit =
                      currentBuy.qty * currentSell.price - currentBuy.quoteQty;
                    currentBuy.qty -= currentSell.qty;
                    currentSell.qty -= currentSell.qty;

                    totalProfit += profit;
                    continue;
                  }
                }
              }

              return totalProfit;
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        "$" +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="card-container">
        <div className="title">Wallets</div>
        <div className="card">
          <div className="profit-title">Realised Gains</div>
          <div className="profit-amount">
            {this.state.profit ? this.state.profit : "Loading..."}
          </div>
          <div className="currency">USD</div>
        </div>
      </div>
    );
  }
}

export default Tax;
