import { useState, useEffect, useCallback } from "react";
import "./App.css";
import TradesList from "./components/TradesList";

function App() {
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTradesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2022-04-03&startDate=2022-04-03"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const a = await response.json();
      const data = a.body.intraDayTradeHistoryList;

      const loadedTrades = [];
      const updatedTrades = [];

      data.forEach(
        (key) =>
          key.conract.includes("H") &&
          loadedTrades.push({
            id: key.id,
            conract: key.conract,
            date: key.date,
            quantity: key.quantity,
            price: key.price,
            priceSum: (key.price * key.quantity) / 10,
            transactionSum: key.quantity / 10,
          })
      );

      let totalPrice = 0;
      let totalTransaction = 0;
      let i = 0;

      const sortedTrades = loadedTrades.sort((a, b) =>
        a.conract.localeCompare(b.conract)
      );

      while (i !== sortedTrades.length - 1) {
        if (sortedTrades[i].conract === sortedTrades[i + 1].conract) {
          totalPrice += sortedTrades[i].priceSum;
          totalTransaction += sortedTrades[i].transactionSum;
        } else {
          updatedTrades.push({
            id: sortedTrades[i].id,
            date: sortedTrades[i].conract,
            totalPrice,
            totalTransaction,
            avg: totalPrice / totalTransaction,
          });
          totalPrice = 0;
          totalTransaction = 0;
        }
        i += 1;
      }

      setTrades(updatedTrades);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTradesHandler();
  }, [fetchTradesHandler]);

  let content = <p>Found no movies.</p>;

  if (trades.length > 0) {
    content = <TradesList trades={trades} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className="App">
      <section>{content}</section>
    </div>
  );
}

export default App;
