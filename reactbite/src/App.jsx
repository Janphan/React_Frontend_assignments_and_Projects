import { useState } from "react";

import "./App.css";
import TodoList from "./assets/components/TodoList";

function App() {
  return (
    <>
      <h3>My Todos</h3>
      <TodoList/>
    </>
  );
}

export default App;
