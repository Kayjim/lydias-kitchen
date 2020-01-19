import React from "react";
import "./App.css";
import SearchAppBar from "./components/appBar";
import SimpleCard from "./components/Cards";

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
