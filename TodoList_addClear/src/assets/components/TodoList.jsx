import React from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useRef, useState } from "react";

function TodoList() {
  // add light theme
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  //add todo state
  const [todo, setTodo] = useState({
    description: "",
    date: "",
    priority: "",
  });

  //add todos state
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();
  
  //add handle Add new todo
  const handleAdd = () => {
    if (todo.description && todo.date && todo.priority) {
      setTodos([...todos, todo]);
      setTodo({ description: "", date: "", priority: "" });
    } else {
      alert("Type a description, priority and date first");
    }
  };
// add column Defs
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
    { field: "date", sortable: true, filter: true, headerName: "Due date",
      valueFormatter: params => params.value.format("DD.MM.YYYY") },
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
  
  
  const handleClear = () => {
    setTodos([]);}
  return (
    <>
      <Stack direction="row" spacing={2} mt={2} justifyContent="center" alignItems="center">
        <TextField
          label="Description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
         <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Priority</InputLabel>
         <Select
          label="Priority"
          value={todo.priority}
          onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
        >
        <MenuItem value={10}>Low</MenuItem>
          <MenuItem value={20}>Medium</MenuItem>
          <MenuItem value={30}>High</MenuItem>
         </Select>
        </FormControl>
        </Box>


        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
        label="Date" 
        format = 'DD.MM.YYYY'
        value={todo.date}
        onChange={(e) => setTodo({ ...todo, date: e })}/>
        {/* value date = e / since it has picked the date */}
        </LocalizationProvider>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" color="error" onClick={handleClear}>
          Clear
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
      <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <main>This app is using the light mode</main>
    </ThemeProvider>
    </>
  );
}
//we have to render after this to use
export default TodoList;
