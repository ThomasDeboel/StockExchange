import React from "react";
import { render, screen } from "@testing-library/react";
import SchedulerForm from "./SchedulerForm";
import { Stock } from "../types";

const mockStock: Stock = {
  name: "StockA",
  history: [],
  scheduleChanges: [],
};

test("renders scheduler form and submits", () => {
  const onSchedule = jest.fn();
  const onImmediateSet = jest.fn();
  render(
    <SchedulerForm
      stock={mockStock}
      onSchedule={onSchedule}
      onImmediateSet={onImmediateSet}
    />
  );
  expect(screen.getByLabelText(/From Value/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/To Value/i)).toBeInTheDocument();
});
