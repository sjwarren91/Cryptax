import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import API from "../../utils/API";

class Summary extends Component {
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

  render() {
    return (
      <div className="container">
        <div className="title">Summary</div>
        <Doughnut
          data={{
            labels: ["Red", "Green", "Yellow"],
            datasets: [
              {
                data: [300, 50, 100],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                borderWidth: 1
              }
            ]
          }}
        />
      </div>
    );
  }
}

export default Summary;
