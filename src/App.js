import React, { useEffect, useState } from "react";
import useAuthentication from "./hooks/useAuthentication";
import { BrowserRouter } from "react-router-dom";
import HeaderMenu from "./common/HeaderMenu/HeaderMenu";
import MainRoute from "./routes/MainRoute";
import "./App.css";
import useApi from "./hooks/axios/useApi";
import URI_CONST from "./hooks/axios/constants/uiriConst";

const App = () => {
  const auth = useAuthentication();
  const sendApi = useApi();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const startUp = async () => {
      await auth.startUp();
      await sendApi(URI_CONST.getTodo);
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
