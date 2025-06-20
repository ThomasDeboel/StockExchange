import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { Stock } from "../types";

const mockStocks: Stock[] = [
  {
    name: "StockA",
    history: [
      { time: new Date(Date.now() - 1000 * 60 * 60).toISOString(), value: 100 },
      { time: new Date().toISOString(), value: 110 },
    ],
    scheduleChanges: [],
  },
  {
    name: "StockB",
    history: [
      { time: new Date(Date.now() - 1000 * 60 * 60).toISOString(), value: 200 },
      { time: new Date().toISOString(), value: 210 },
    ],
    scheduleChanges: [],
  },
];

test("renders all stock cards and graphs", () => {
  render(<Home stocks={mockStocks} />);
  expect(screen.getByText("Market Dashboard")).toBeInTheDocument();
  expect(screen.getByText("StockA")).toBeInTheDocument();
  expect(screen.getByText("StockB")).toBeInTheDocument();
  // Check for download button
  expect(screen.getAllByText(/Download Last Week CSV/i)).toHaveLength(2);
});
