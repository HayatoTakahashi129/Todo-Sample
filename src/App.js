import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRoute from "./routes/MainRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <MainRoute />
    </BrowserRouter>
  );
}

export default App;
