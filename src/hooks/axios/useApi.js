import { useSelector } from "react-redux";
import useAuthentication from "../useAuthentication";
import axiosInstance from "./axiosInstance";

const useApi = () => {
  const axios = axiosInstance();
  //   const auth = useAuthentication();
  const idToken = useSelector((state) => state.user.idToken);

  const requestConfig = (config) => {
    config.headers = {
      Authorization: `Bearer ${idToken}`,
      "content-type": "application/json",
    };
    return config;
  };

  const error400handler = (error) => {};
  const error500handler = (error) => {};
  const errorDefaultHandler = (error) => {};

  const respnoseErrorHandler = (error) => {
    console.log(error);
    switch (error.response.status) {
      case 400:
        error400handler(error);
        break;
      case 500:
        error500handler(error);
        break;
      default:
        errorDefaultHandler(error);
        break;
    }
    return error;
  };

  axios.interceptors.request.use(requestConfig);
  axios.interceptors.response.use((config) => config, respnoseErrorHandler);

  const sendApi = async (config, data = undefined) => {
    const response = await axios.request({
      ...config,
      data,
    });
    return response.data;
  };

  return sendApi;
};

export default useApi;
