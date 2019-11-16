import React, { Component } from "react";
import API from "../../utils/API";

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
    console.log(data);
  };

  getHoldings = () => {
    API.getHoldings()
      .then(res => {
        // console.log(res.data.balances);
        const filtered = res.data.balances
          .map(obj => {
            var rObj = obj;
            rObj.free = parseFloat(parseFloat(obj.free).toFixed(2));
            return rObj;
          })
          .filter(coin => coin.free > 0);

        this.setState({
          holdings: filtered
        });
        console.log(this.state.holdings);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getCoinTrades = coin => {
    return API.getTrades(coin)
      .then(data => {
        console.log(data.data);
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
                // console.log(currentBuy)
                for (const currentSell of sells) {
                  let profit = 0;
                  if (currentSell.time < currentBuy.time) {
                    //if buy time isnt before sell time => check next sell event
                    continue;
                  } else if (currentSell.qty == 0) {
                    // if current sell quantity = 0 => check next sell event
                    continue;
                  } else if (currentBuy.qty <= currentSell.qty) {
                    profit =
                      currentBuy.qty * currentSell.price - currentBuy.quoteQty;
                    // console.log(currentSell.qty)
                    currentSell.qty -= currentBuy.qty;

                    // console.log("Buy: " + currentBuy.qty);
                    // console.log("Sell: " + currentSell.qty);

                    totalProfit += profit;
                    break;
                  } else if (currentBuy.qty > currentSell.qty) {
                    profit =
                      currentBuy.qty * currentSell.price - currentBuy.quoteQty;
                    // console.log(currentSell.qty);
                    currentBuy.qty -= currentSell.qty;
                    currentSell.qty -= currentSell.qty;

                    // console.log("Buy: " + currentBuy.qty);
                    // console.log("Sell: " + currentSell.qty);

                    totalProfit += profit;
                    continue;
                  }
                }
              }

              console.log("Total Profit " + totalProfit);
              return totalProfit;
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));

    // return totalProfit;

    // console.log(buys)
    // console.log(sells)

    // Promise.all(
    //   data.data.map(element => {
    //     // console.log(element.qty);
    //     return API.getHistoricPrice(element.time).then(data => {
    //       let sum = 0;
    //       let qty = 0;

    //       if (element.isBuyer) {
    //         // console.log(element.price, element.qty, data.data[0][3]);
    //         if(!testBuy[element.price]) {
    //           testBuy[element.price] = 0;
    //         }
    //         testBuy[element.price] += parseFloat(element.qty);

    //         qty = parseFloat(element.qty)
    //         qtyBought += qty;
    //         sum = element.price * element.qty * data.data[0][3];
    //         totalBought += sum;
    //         // console.log("total Bought: " + totalBought)
    //       } else {
    //         if(!testSold[element.price]) {
    //           testSold[element.price] = 0;
    //         }
    //         testSold[element.price] += parseFloat(element.qty);

    //         qty = parseFloat(element.qty)
    //         qtySold += qty;
    //         sum = element.price * element.qty * data.data[0][3];
    //         totalSold += sum;
    //         // console.log("total sold: " + totalSold)
    //       }
    //     });
    //   })
    // ).then(() => {
    //   // console.log(totalBought, "qty: " + qtyBought.toFixed(2))
    //   // console.log(totalSold, "qty: " + qtySold.toFixed(2))
    //   // console.log(testBuy)
    //   // console.log(testSold)
    // });
  };

  render() {
    return (
      <div>
        <div className="trades">Trades</div>
        <button onClick={() => this.getCoinTrades("ETH")}>Trade</button>
        <button onClick={() => this.getCombinedTrades()}>Trades</button>
        <button onClick={() => this.getWithdrawals()}>Withdrawals</button>
      </div>
    );
  }
}

export default Tax;
