import React, { Component } from "react";
import Chart from "react-apexcharts";
import API from "../../utils/API";
import "./style.css";

class Kline extends Component {
  state = {
    data: [],
    coinSearch: "",
    previous: "BTCUSDT"
  };

  getKline = (coin, interval) => {
    // console.log(coin, interval)
    API.getKlines(coin, interval)
      .then(data => {
        let array = [];
        data.data.forEach(candle => {
          array.push([new Date(candle[0]), [candle[1], candle[2], candle[3], candle[4]]]);
        });

        // console.log(array);

        this.setState({
          data: array
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getKline("BTCUSDT", "1d");
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      previous: value
    });
  };

  handleClick = (e, data) => {
    this.getKline(this.state.previous, data)
  };

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
        <div className="title-container">
          <div className="title">Details</div>
          <form className="search">
            <input
              type="search"
              id="coin-search"
              value={this.state.coinSearch}
              name="coinSearch"
              placeholder="Search"
              onChange={this.handleInputChange}
              onKeyDown={e =>
                e.key === "Enter"
                  ? (e.preventDefault(), this.setState({ coinSearch: "" }), this.getKline(this.state.coinSearch, "30m"))
                  : null
              }
            />
          </form>
          <div className="accuracy">
            <div className="time" onClick={e => this.handleClick(e, "30m")}>
              30m
            </div>
            <div className="time" onClick={e => this.handleClick(e, "1h")}>
              1h
            </div>
            <div className="time" onClick={e => this.handleClick(e, "4h")}>
              4h
            </div>
            <div className="time" onClick={e => this.handleClick(e, "1d")}>
              1d
            </div>
          </div>
        </div>

        <div id="chart-box">
          <div id="chart-candlestick">
            <Chart options={options} series={seriesCandle} type="candlestick" height={"100%"} />
          </div>
        </div>
      </div>
    );
  }
}

export default Kline;
