import React from "react";
import "./style.css";

export function Table({ children }) {
  return (
    <div className="table-container">
      <table className="holdings">
        <thead>
          <tr className="table-head">
            <th className="tcol">Coin</th>
            <th className="tcol">Price</th>
            <th className="tcol">Holding</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function TableItem(props) {
  return (
    <tr>
      <td>{props.coin}</td>
      <td>{props.price}</td>
      <td>{props.holding}</td>
    </tr>
  );
}
