import React from "react";
import classes from "./Trade.module.css";

function Trades(props) {
  const date = props.date;
  const year = "20" + date.slice(2, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hour = date.slice(8) + ":00";

  return (
    <tr>
      <td>{`${day}.${month}.${year} ${hour}`}</td>
      <td>
        {Math.floor(props.transaction)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </td>
      <td className={classes.currency}>
        {Math.floor(props.price)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </td>
      <td>
        {Math.floor(props.avg)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </td>
    </tr>
  );
}

export default Trades;
