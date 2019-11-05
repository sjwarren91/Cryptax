import React, { Component } from "react";
import { Table, TableItem } from "../Table/index";
import API from "../../utils/API";
import "./Portfolio.css";

class Portfolio extends Component {
  state = {
    holdings: []
  };

  componentDidMount() {
    this.getHoldings();
  }

  getHoldings = () => {
    API.getHoldings()
      .then(res => {
        console.log(res.data.balances);
        const filtered = res.data.balances
        .map(obj =>  {
          var rObj = obj;
          rObj.free = parseFloat(parseFloat(obj.free).toFixed(2))
          return rObj;
        })
        .filter(coin => coin.free > 0)
        
        this.setState({
          holdings: filtered
        });
      })
      .catch(err => {
        console.log(err);
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
                    price="$$$"
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
