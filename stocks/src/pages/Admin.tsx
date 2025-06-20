import React, { useState } from "react";
import { Stock } from "../types";
import SchedulerForm from "../components/SchedulerForm";
import "./Admin.css";

type AdminProps = {
  stocks: Stock[];
  setStocks: React.Dispatch<React.SetStateAction<Stock[]>>;
};

const Admin: React.FC<AdminProps> = ({ stocks, setStocks }) => {
  const [selectedStock, setSelectedStock] = useState<string>(
    stocks[0]?.name || ""
  );

  // Callback to schedule a new value change
  function handleScheduleChange(
    stockName: string,
    startTime: string,
    endTime: string,
    fromValue: number,
    toValue: number
  ) {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.name === stockName
          ? {
              ...stock,
              scheduleChanges: [
                ...stock.scheduleChanges,
                { startTime, endTime, fromValue, toValue },
              ],
            }
          : stock
      )
    );
  }

  // Callback to immediately set a value
  function handleImmediateSet(stockName: string, value: number) {
    const getCurrentTimeISO = () => {
      const now = new Date();
      now.setSeconds(0, 0);
      return now.toISOString();
    };

    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.name === stockName
          ? {
              ...stock,
              history: [...stock.history, { time: getCurrentTimeISO(), value }],
              scheduleChanges: [],
            }
          : stock
      )
    );
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin: Schedule Stock Value Change</h1>
      <div className="admin-selector">
        <label>
          Select Stock:{" "}
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
          >
            {stocks.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedStock && (
        <SchedulerForm
          stock={stocks.find((s) => s.name === selectedStock)!}
          onSchedule={handleScheduleChange}
          onImmediateSet={handleImmediateSet}
        />
      )}
    </div>
  );
};

export default Admin;
