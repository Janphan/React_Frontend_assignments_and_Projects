import App from "./src/App";
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TodoList from "./src/assets/components/TodoList";

test("renders TodoList component", () => {
  render(<App />);
  const header = screen.getByText(/My Todos/i);
  expect(header).toBeInTheDocument();
});

test("clear all", () => {
  render(<TodoList />);

  const descriptionInput = screen.getByLabelText("Description");
  const priorityInput = screen.getByLabelText("Priority");
  const dateInput = screen.getByLabelText("Date");

  fireEvent.change(descriptionInput, {
    target: { value: "Read" },
  });
  fireEvent.change(priorityInput, {
    target: { value: "Low" },
  });
  fireEvent.change(dateInput, {
    target: { value: "20.03.2024" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Add" }));

  expect(screen.getByText(/read/i)).toBeInTheDocument();
  expect(screen.getByText(/Low/i)).toBeInTheDocument();
  expect(screen.getByText(/20.03.2024/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Clear" }));

  expect(screen.queryByText(/read/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Low/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/20.03.2024/i)).not.toBeInTheDocument();
});
