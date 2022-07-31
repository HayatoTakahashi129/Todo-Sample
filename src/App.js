import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import HeaderMenu from "./common/HeaderMenu/HeaderMenu";
import MainRoute from "./routes/MainRoute";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <HeaderMenu />
          <MainRoute />
        </BrowserRouter>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
