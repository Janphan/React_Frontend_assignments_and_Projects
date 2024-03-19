import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./App.css";
import TodoList from "./assets/components/TodoList";
import BasicTabs from "./BasicTabs";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  return (
    <>
     <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My Todos</Typography>
      </Toolbar>
     </AppBar>
     <BasicTabs/>
     <ThemeProvider theme={lightTheme}>
      <CssBaseline />
    </ThemeProvider>
    </>
    
  );
}

export default App;
