import React from "react";
import "./TradesList.module.css";

import Trade from "./Trade";

function TradesList(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Tarih</th>
          <th>Toplam İşlem Miktarı (MWh)</th>
          <th>Toplam İşlem Tutarı (TL)</th>
          <th>Ağırlık Ortalama Fiyat (TL/MWh)</th>
        </tr>
      </thead>
      <tbody>
        {props.trades.map((trade) => (
          <Trade
            key={trade.id}
            date={trade.date}
            price={trade.totalPrice}
            transaction={trade.totalTransaction}
            avg={trade.avg}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TradesList;
