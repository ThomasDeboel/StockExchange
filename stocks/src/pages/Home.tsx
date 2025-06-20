import React from "react";
import { Stock } from "../types";
import StockGraph from "../components/StockGraph";
import "./Home.css";

type HomeProps = {
  stocks: Stock[];
};

const Home: React.FC<HomeProps> = ({ stocks }) => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Market Dashboard</h1>
      <div className="stock-grid">
        {stocks.map((stock) => (
          <div className="stock-card" key={stock.name}>
            <h2>{stock.name}</h2>
            <StockGraph stock={stock} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
