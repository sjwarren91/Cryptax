import React from "react";
import "./style.css";
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

export function Table({ children }) {
  return (
    <div className="holdings-table">
      <div className="holdings-table-head">
        <div className="tcol">Coin</div>
        <div className="tcol">Price</div>
        <div className="tcol">Holding</div>
      </div>
      <SimpleBarReact forceVisible="y" style={{ height: '125px' }}>
        <div className="holdings-table-body">{children}</div>
      </SimpleBarReact>
    </div>
  );
}

export function TableItem(props) {
  return (
    <div className="table-row">
      <div className="table-data">{props.coin}</div>
      <div className="table-data">{props.price}</div>
      <div className="table-data">{props.holding}</div>
    </div>
  );
}

// <table className="holdings">
//         <thead>
//           <tr className="table-head">
//             <th className="tcol">Coin</th>
//             <th className="tcol">Price</th>
//             <th className="tcol">Holding</th>
//           </tr>
//         </thead>
//         <tbody>{children}</tbody>
//       </table>
