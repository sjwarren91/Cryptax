import React, { Component } from "react";
import Portfolio from "./components/Portfolio/Portfolio";
import Tax from "./components/Tax/index";
import Summary from "./components/Chart/index";
import Kline from "./components/Kline/index"
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <div className="content">
          <div className="row1">
            <div className="col1">
              <Portfolio />
            </div>
            <div className="col2">
              <Tax />
            </div>
          </div>
          <div className="row2">
            <div className="col2">
              <Summary />
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
