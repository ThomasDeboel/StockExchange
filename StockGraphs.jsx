import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function StockGraphs() {
  const [stocks, setStocks] = useState({});
  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3001/api/stocks')
        .then(res => res.json())
        .then(data => setStocks(data));
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      {Object.entries(stocks).map(([key, stock]) => (
        <div key={key}>
          <h2>{key}</h2>
          <Line data={{
            labels: stock.history.map(h => new Date(h.time).toLocaleTimeString()),
            datasets: [{ label: key, data: stock.history.map(h => h.value) }]
          }} />
        </div>
      ))}
    </div>
  );
}

export default StockGraphs;