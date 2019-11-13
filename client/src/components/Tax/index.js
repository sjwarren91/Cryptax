import React, { Component } from "react";
import API from "../../utils/API";

class Tax extends Component {
  getTrades = () => {
    let totalBought = 0;
    let totalSold = 0;
    API.getTrades().then(data => {
      // console.log(data.data);
      Promise.all(
        data.data.map(element => {
          // console.log(element.time);
          return API.getHistoricPrice(element.time).then(data => {
            let sum = 0;
            if (element.isBuyer) {
              // console.log(element.price, element.qty, data.data[0][3]);
              sum = element.price * element.qty * data.data[0][3];
              totalBought += sum;
              // console.log("total Bought: " + totalBought)
            } else {
              sum = element.price * element.qty * data.data[0][3];
              totalSold += sum;
              // console.log("total sold: " + totalSold)
            }
          });
        })
      ).then(() => {
        console.log(totalBought)
        console.log(totalSold)
      });
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
