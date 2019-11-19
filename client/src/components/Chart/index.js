import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class Summary extends Component {
  render() {
    let data = {
      labels: this.props.labels,
      datasets: [
        {
          data: this.props.data,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#6CFFCD", "#775DD0"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#6CFFCD", "#775DD0"],
          borderWidth: 1
        }
      ],
    };

    return (
      <div className="container">
        <div className="title">Summary</div>
        <Doughnut
          data={data}
          legend={{
            labels: {
              fontSize: 10,
              fontColor: "#fff",
              boxWidth: 30
            }
          }}
        />
      </div>
    );
  }
}

export default Summary;
