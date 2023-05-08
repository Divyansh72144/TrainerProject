import React from "react";
import Customerlist from "./components/CustomerList";
import Header from "./components/Header"
import "./App.css";


function App() {
  return (
    <div className="App">
      <Header />
      <Customerlist />
    </div>
  );
}

export default App;
