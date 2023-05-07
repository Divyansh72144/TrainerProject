import React from "react";
import "./App.css";
import Customerlist from "./components/customerlist";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">CustomerList</Typography>
        </Toolbar>
      </AppBar>
      <Customerlist />
    </div>
  );
}

export default App;
