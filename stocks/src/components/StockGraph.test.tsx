import React from "react";
import { render, screen } from "@testing-library/react";
import StockGraph from "./StockGraph";
import { Stock } from "../types";

const mockStock: Stock = {
  name: "StockA",
  history: [
    {
      time: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
      value: 100,
    },
    { time: new Date().toISOString(), value: 110 },
  ],
  scheduleChanges: [],
};

test("renders stock graph and download button", () => {
  render(<StockGraph stock={mockStock} />);
  expect(screen.getByText("StockA")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Download Last Week CSV/i })
  ).toBeInTheDocument();
});
