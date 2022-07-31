import React, { useEffect, useState } from "react";
import useAuthentication from "./hooks/useAuthentication";
import { BrowserRouter } from "react-router-dom";
import HeaderMenu from "./common/HeaderMenu/HeaderMenu";
import MainRoute from "./routes/MainRoute";
import "./App.css";

const App = () => {
  const auth = useAuthentication();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const startUp = async () => {
      await auth.startUp();
      setIsLoading(false);
    };
    startUp();
  }, []);

  return (
    !isLoading && (
      <BrowserRouter>
        <HeaderMenu />
        <MainRoute />
      </BrowserRouter>
    )
  );
};

export default App;
