import App from "./src/App";
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import TodoTable from "./src/assets/components/TodoTable";
import TodoList from "./src/assets/components/TodoList";

test("renders App component", () => {
  render(<App />);
  const header = screen.getByText(/My Todos/i);
  expect(header).toBeInTheDocument();
});

test('add todo', () => {
    const row = [
      {description: 'Go to coffee', date: '24.01.2023', priority: 'low'}
    ];
    render(<TodoTable todos={row} />);
    const table = screen.getByRole('table');
    expect(table).toHaveTextContent((/go to coffee/i));
  });

  test('clear button removes all todos from table', () => {
    render(<TodoList />);
    
    // Add some todos
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Go to coffee' } });
    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-03-10' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Exercise' } });
    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'Medium' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-03-11' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  
    // Click clear button
    const button = screen.getByRole('button', { name: 'Clear' });
    
    fireEvent.click(button);
    
    // Assert table is empty after clearing
    expect(screen.queryByText('Go to coffe')).not.toBeInTheDocument();
    expect(screen.queryByText('Exercise')).not.toBeInTheDocument();
    expect(screen.queryByText('High')).not.toBeInTheDocument();
    
  });