import React, { Component } from "react";
import Portfolio from "./components/Portfolio/Portfolio";
import Tax from "./components/Tax/index";
import Summary from "./components/Chart/index";
import Kline from "./components/Kline/index"
import "./App.css";
// import { parse } from "path";

class App extends Component {

  state = {
    holdings: []
  };

  handleUpdateHoldings = (data) => {
    this.setState({
      holdings: data
    })
  }

  render() {
    return (
      <>
        <div className="content">
          <div className="row1">
            <div className="col1">
              <Portfolio 
              onUpdateHoldings={this.handleUpdateHoldings}
              holdings={this.state.holdings}
              />
            </div>
            <div className="col2">
              <Tax />
            </div>
          </div>
          <div className="row2">
            <div className="col2">
              <Summary 
              labels={this.state.holdings ? this.state.holdings.filter(coin => {
                return (parseInt(coin.price) > 0)
              }).map(element => {
                return element.asset
              }): []}
              data={this.state.holdings ? this.state.holdings.filter(coin => {
                return (parseInt(coin.price) > 0)
              }).map(element => {
                return parseInt(element.price)
              }): []}
              />
            </div>
            <div className="col1">
              <Kline />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
