import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Admin from "./Admin";
import { Stock } from "../types";

const mockStocks: Stock[] = [
  {
    name: "StockA",
    history: [],
    scheduleChanges: [],
  },
  {
    name: "StockB",
    history: [],
    scheduleChanges: [],
  },
];

test("renders admin and allows selecting a stock", () => {
  const setStocks = jest.fn();
  render(<Admin stocks={mockStocks} setStocks={setStocks} />);
  expect(
    screen.getByText(/Admin: Schedule Stock Value Change/i)
  ).toBeInTheDocument();
  // Dropdown present
  expect(screen.getByLabelText(/Select Stock/i)).toBeInTheDocument();
  // Change selection
  fireEvent.change(screen.getByLabelText(/Select Stock/i), {
    target: { value: "StockB" },
  });
  expect(screen.getByDisplayValue("StockB")).toBeInTheDocument();
});
