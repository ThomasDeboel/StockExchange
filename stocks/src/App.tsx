import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Stock } from "./types";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

// Helper for localStorage
function loadStocks(): Stock[] {
  const saved = localStorage.getItem("stocks");
  if (saved) return JSON.parse(saved);

  const time = new Date();
  time.setSeconds(0, 0);
  const iso = time.toISOString();
  return [
    {
      name: "StockA",
      history: [{ time: iso, value: 120 }],
      scheduleChanges: [],
    },
    {
      name: "StockB",
      history: [{ time: iso, value: 80 }],
      scheduleChanges: [],
    },
    {
      name: "StockC",
      history: [{ time: iso, value: 200 }],
      scheduleChanges: [],
    },
  ];
}
function saveStocks(stocks: Stock[]) {
  localStorage.setItem("stocks", JSON.stringify(stocks));
}

// 5 minutes in ms
const UPDATE_INTERVAL_MS = 1 * 60 * 1000;

const App: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>(loadStocks);

  // Update stocks every 5 minutes (simulate market)
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) => {
        const now = new Date();
        const nowISO = (() => {
          const d = new Date(now);
          d.setSeconds(0, 0);
          return d.toISOString();
        })();

        return prevStocks.map((stock) => {
          let newValue = stock.history[stock.history.length - 1].value;

          // Scheduled change support (start time is last history point)
          const activeChange = stock.scheduleChanges.find((ch) => {
            const start = new Date(
              stock.history[stock.history.length - 1].time
            );
            const end = new Date(ch.endTime);
            return start <= now && end >= now;
          });
          if (activeChange) {
            const start = new Date(
              stock.history[stock.history.length - 1].time
            );
            const end = new Date(activeChange.endTime);
            const totalMs = end.getTime() - start.getTime();
            const elapsedMs = now.getTime() - start.getTime();
            const progress = totalMs > 0 ? elapsedMs / totalMs : 1;
            newValue =
              activeChange.fromValue +
              (activeChange.toValue - activeChange.fromValue) * progress;
          } else if (stock.scheduleChanges.length > 0) {
            const lastPast = stock.scheduleChanges
              .filter((ch) => new Date(ch.endTime) < now)
              .sort((a, b) => +new Date(b.endTime) - +new Date(a.endTime))[0];
            if (lastPast) newValue = lastPast.toValue;
          }

          if (
            stock.history.length === 0 ||
            stock.history[stock.history.length - 1].time !== nowISO
          ) {
            return {
              ...stock,
              history: [...stock.history, { time: nowISO, value: newValue }],
            };
          } else {
            return stock;
          }
        });
      });
    }, UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    saveStocks(stocks);
  }, [stocks]);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-logo">📈 Fake Stock Market</div>
          <div className="navbar-links">
            <Link to="/">Dashboard</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home stocks={stocks} />} />
            <Route
              path="/admin"
              element={<Admin stocks={stocks} setStocks={setStocks} />}
            />
          </Routes>
        </main>
        <footer className="footer">
          &copy; {new Date().getFullYear()} Fake Stock Market Simulator
        </footer>
      </div>
    </Router>
  );
};

export default App;
