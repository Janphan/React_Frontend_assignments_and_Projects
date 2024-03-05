import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./App.css";
import TodoList from "./assets/components/TodoList";

function App() {
  return (
    <>
     <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My Todos</Typography>
      </Toolbar>
     </AppBar>
      <TodoList/>
      
    </>
  );
}

export default App;
