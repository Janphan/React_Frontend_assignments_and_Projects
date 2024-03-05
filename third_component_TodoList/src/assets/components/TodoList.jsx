import React from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { useRef, useState } from "react";

function TodoList() {
  const [todo, setTodo] = useState({
    description: "",
    date: "",
    priority: "",
  });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();
  const handleAdd = () => {
    if (todo.description && todo.date && todo.priority) {
      setTodos([...todos, todo]);
      setTodo({ description: "", date: "", priority: "" });
    } else {
      alert("Type a description, priority and date first");
    }
  };

  const [columnDefs, setColumnDefs] = useState([
    { field: "description", sortable: true, filter: true, editable: true },
    {
      field: "priority",
      sortable: true,
      editable: true,
      filter: true,
      cellStyle: (params) =>
        params.value === "High" || params.value === "high"
          ? { color: "red" }
          : { color: "black" },
    },
    { field: "date", sortable: true, filter: true, editable: true },
  ]);
  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
      // gridRef.current.getSelectedNodes()[0].id -> this is the 1st row selected
      //only row having different index saved to todos
    } else {
      alert("Select a row first");
    }
    //at least one row selected
  };
  return (
    <>
      <Stack direction="row" spacing={2} mt={2} justifyContent="center" alignItems="center">
        <TextField
          label="Description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />

        <TextField
          label="Priority"
          value={todo.priority}
          onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
        />

        <TextField
          label="Date"
          value={todo.date}
        onChange={(e) => setTodo({ ...todo, date: e.target.value })}
        />

        {/* testing */}
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
      <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection="single"
        />
      </div>
    </>
  );
}
//we have to render after this to use
export default TodoList;
