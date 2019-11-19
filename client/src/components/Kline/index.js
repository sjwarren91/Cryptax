import React, { Component } from "react";
import Chart from "react-apexcharts";
import API from "../../utils/API";

class Kline extends Component {
  state = {
    data: []
  };

  getKline = () => {
    API.getKlines("NEBLBTC").then(data => {
        let array = []
        data.data.forEach(candle => {
            array.push([new Date(candle[0]), [candle[1], candle[2], candle[3], candle[4]]])
        })

        console.log(array)

        this.setState({
            data: array
        })
        
    }).catch(err => console.log(err))
  }

  componentDidMount() {
      this.getKline();
  }

  render() {
    let options = {
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
        type: "datetime",
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
    };

    let seriesCandle = [
        {
          data: this.state.data
        }
      ];

    return (
      <div>
        <div className="title">Details</div>
        <div id="chart-box">
          <div id="chart-candlestick">
            <Chart
              options={options}
              series={seriesCandle}
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
