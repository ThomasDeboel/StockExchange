import React, { useState } from "react";
import { Stock } from "../types";

// Props:
// - stock: the currently selected Stock object
// - onSchedule: function to schedule a value change (stockName, startTime, endTime, fromValue, toValue)
// - onImmediateSet: function to immediately set the stock's value (stockName, value)
type Props = {
  stock: Stock;
  onSchedule: (
    stockName: string,
    startTime: string,
    endTime: string,
    fromValue: number,
    toValue: number
  ) => void;
  onImmediateSet: (stockName: string, value: number) => void;
};

const SchedulerForm: React.FC<Props> = ({
  stock,
  onSchedule,
  onImmediateSet,
}) => {
  // Default values: now for end, current value for fromValue
  const now = new Date();
  const toISOStringLocal = (d: Date) => d.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"

  const [fromValue, setFromValue] = useState(
    stock.history[stock.history.length - 1]?.value || 0
  );
  const [toValue, setToValue] = useState(
    (stock.history[stock.history.length - 1]?.value || 0) + 10
  );
  const [endTime, setEndTime] = useState(
    toISOStringLocal(new Date(now.getTime() + 60 * 60 * 1000))
  );

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const startTime =
      stock.history[stock.history.length - 1]?.time || new Date().toISOString();
    if (new Date(endTime) <= new Date(startTime)) {
      alert("End time must be after the last history point.");
      return;
    }
    onSchedule(
      stock.name,
      startTime,
      new Date(endTime).toISOString(),
      fromValue,
      toValue
    );
    // Optionally reset form
  };

  const handleImmediate = () => {
    onImmediateSet(stock.name, toValue);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 24,
        borderRadius: 8,
        background: "#f9f9f9",
        marginTop: 24,
        maxWidth: 400,
      }}
    >
      <h3>Schedule Value Change for {stock.name}</h3>
      <form onSubmit={handleSchedule}>
        <div>
          <label>
            From Value:{" "}
            <input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(Number(e.target.value))}
              step="any"
              required
            />
          </label>
        </div>
        <div>
          <label>
            To Value:{" "}
            <input
              type="number"
              value={toValue}
              onChange={(e) => setToValue(Number(e.target.value))}
              step="any"
              required
            />
          </label>
        </div>
        <div>
          <label>
            End Time:{" "}
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit">Schedule Change</button>
          <button
            type="button"
            style={{ marginLeft: 12 }}
            onClick={handleImmediate}
          >
            Set Value Instantly
          </button>
        </div>
      </form>
      <p style={{ fontSize: "0.9em", color: "#555", marginTop: 12 }}>
        You can either schedule a smooth change (from now to end time) or
        instantly set the value.
      </p>
    </div>
  );
};

export default SchedulerForm;
