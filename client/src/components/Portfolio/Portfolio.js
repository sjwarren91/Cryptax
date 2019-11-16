import React, { Component } from "react";
import { Table, TableItem } from "../Table/index";
import API from "../../utils/API";
import "./Portfolio.css";

class Portfolio extends Component {
  state = {
    holdings: [],
    btc: 0
  };

  componentDidMount() {
    this.getBTCPrice();
  }

  getHoldings = () => {
    API.getHoldings()
      .then(res => {
        console.log(res.data.balances);
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
        this.getCoinPrice();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getBTCPrice = () => {
    API.getCoinPrice("BTC").then(res => {
      this.setState({
        btc: parseFloat(parseFloat(res.data.price).toFixed(2))
      });
      this.getHoldings();
    });
  };

  getCoinPrice = () => {
    let array = this.state.holdings;
    Promise.all(this.state.holdings.map(coin => {
      return API.getCoinPrice(coin.asset)
    })).then(data => {
      data.forEach((element, i) => {
        if(array[i].asset === "BTC") {
          array[i].price = 1;
        } else {
          array[i].price = parseFloat(element.data.price);
        }
      })
      this.setState({
        holdings: array
      })
    });
      
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
      <>
        <div className="container">
          <div className="title">Main Portfolio</div>
          <Table>
            {this.state.holdings.length ? (
              this.state.holdings.map(coin => {
                return (
                  <TableItem
                    key={coin.asset}
                    coin={coin.asset}
                    price={(coin.price && this.state.btc) ? this.formatMoney((parseFloat(coin.price) * this.state.btc * coin.free)) : "..."}
                    holding={coin.free}
                  />
                );
              })
            ) : (
              <div>No Coins</div>
            )}
          </Table>
        </div>
      </>
    );
  }
}

export default Portfolio;
