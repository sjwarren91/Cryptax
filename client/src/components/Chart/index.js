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

    let legend = {};

    if (this.props.height > 650 ) {
      legend = {
        labels: {
          fontSize: 16,
          fontColor: "#fff",
          boxWidth: 30
        }
      }
    } else {
      legend = {
        labels: {
          fontSize: 11,
          fontColor: "#fff",
          boxWidth: 30
        }
      }
    }

    return (
      <div className="container">
        <div className="title">Summary</div>
        <Doughnut
          data={data}
          legend={legend}
        />
      </div>
    );
  }
}

export default Summary;
