import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import HeaderMenu from "./common/HeaderMenu/HeaderMenu";
import MainRoute from "./routes/MainRoute";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <HeaderMenu />
        <MainRoute />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
