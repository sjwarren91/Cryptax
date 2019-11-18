import React, { Component } from "react";
import Chart from "react-apexcharts"
import API from "../../utils/API";

class Kline extends Component {
  state = {
    seriesCandle: [
      {
        data: [
          [1538856000000, [6593.34, 6600, 6582.63, 6600]],
          [1538856900000, [6595.16, 6604.76, 6590.73, 6593.86]]
        ]
      }
    ],
    chartOptionsCandlestick: {
      chart: {
        id: "candles",
        toolbar: {
          autoSelected: "pan",
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#3C90EB",
            downward: "#DF7D46"
          }
        }
      },

      xaxis: {
          type: 'datetime',
          labels: {
              style: {
                  colors: "#fff"
              }
          }
      },

      yaxis: {
          tooltip: {
              enabled: true
          },
          labels: {
              style: {
                  color: "#fff"
              }
          }
      }
    }
  };
  render() {
    return (
      <div>
          <div className="title">Details</div>
        <div id="chart-box">
          <div id="chart-candlestick">
            <Chart
              options={this.state.chartOptionsCandlestick}
              series={this.state.seriesCandle}
              type="candlestick"
              height={200}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Kline;
