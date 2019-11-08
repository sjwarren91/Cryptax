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
                    price={(coin.price && this.state.btc) ? (parseFloat(coin.price) * this.state.btc * coin.free).toFixed(2) : "..."}
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
