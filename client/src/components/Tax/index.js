import React, { Component } from "react";
import API from "../../utils/API";

class Tax extends Component {
  getTrades = () => {
    let totalBought = 0;
    let totalSold = 0;
    API.getTrades().then(data => {
      console.log(data.data);
      data.data.forEach(element => {

      })
    });
  };

  render() {
    return (
      <div>
        <div className="trades">Trades</div>
        <button onClick={() => this.getTrades()}>Click</button>
      </div>
    );
  }
}

export default Tax;
