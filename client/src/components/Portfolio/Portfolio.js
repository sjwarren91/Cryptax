import React, { Component } from "react";
import { Table, TableItem } from "../Table/index";
import API from "../../utils/API";
import "./Portfolio.css";

class Portfolio extends Component {
  state = {
    holdings: []
  };

  

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
