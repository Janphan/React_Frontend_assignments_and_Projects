import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Container from "@mui/material/Container";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Carlist from "./components/carlist";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Car Shop</Typography>
          </Toolbar>
        </AppBar>
        <Carlist/>
      </Container>
    </>
  );
}

export default App;
