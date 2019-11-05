import React, { Component } from "react";
import { Table, TableItem } from "../Table/index";
import API from "../../utils/API";
import "./Portfolio.css";

class Portfolio extends Component {
  state = {
    holdings: []
  };

  componentDidMount() {
    this.getHoldings();
  }

  getHoldings = () => {
    API.getHoldings().then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err)
    })
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="title">Main Portfolio</div>
          <Table>
            <TableItem coin="coin" price="price" holding="holdings" />
          </Table>
        </div>
      </>
    )
  }
}

export default Portfolio;
