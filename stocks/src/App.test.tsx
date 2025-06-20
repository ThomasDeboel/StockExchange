import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders dashboard at /", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Market Dashboard/i)).toBeInTheDocument();
});

test("renders admin at /admin", () => {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <App />
    </MemoryRouter>
  );
  expect(
    screen.getByText(/Admin: Schedule Stock Value Change/i)
  ).toBeInTheDocument();
});
