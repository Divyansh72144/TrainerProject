import React from "react";
import Customerlist from "./components/CustomerList";
import TrainingsList from "./components/TrainingsList";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Customerlist />
      <TrainingsList />
    </div>
  );
}

export default App;
