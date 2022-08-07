import { useSelector } from "react-redux";
import useAuthentication from "../useAuthentication";
import axiosInstance from "./axiosInstance";

const useApi = () => {
  const axios = axiosInstance();
  const auth = useAuthentication();
  const idToken = useSelector((state) => state.user.idToken);

  const requestConfig = (config) => {
    config.headers = {
      Authorization: `Bearer ${idToken}`,
      "content-type": "application/json",
    };
    return config;
  };

  const error400handler = (error) => {
    return error;
  };
  const error401Handler = async (error) => {
    await auth.refresh();
    console.log(error);
    return axios.request(error.config);
  };
  const error500handler = (error) => {
    return error;
  };
  const errorDefaultHandler = (error) => {
    return error;
  };

  const respnoseErrorHandler = (error) => {
    console.log(error);
    switch (error.response.status) {
      case 400:
        return error400handler(error);
      case 401:
        return error401Handler(error);
      case 500:
        return error500handler(error);
      default:
        return errorDefaultHandler(error);
    }
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
