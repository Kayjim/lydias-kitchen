import React from "react";
import "./App.css";
import SearchAppBar from "./components/AppBar";
import SimpleCard from "./components/cards";

function App() {
  return (
    <div>
      <SearchAppBar></SearchAppBar>
      <div className="card-container">
        <SimpleCard></SimpleCard>
        <SimpleCard></SimpleCard>
        <SimpleCard></SimpleCard>
        <SimpleCard></SimpleCard>
        <SimpleCard></SimpleCard>
        <SimpleCard></SimpleCard>
        <SimpleCard></SimpleCard>
        <SimpleCard></SimpleCard>
        <SimpleCard></SimpleCard>
        <SimpleCard></SimpleCard>
      </div>
    </div>
  );
}

export default App;
