import { useDispatch } from "react-redux";
import { updateData, addData } from "../../store/slices/getApiSlice";
import useAuthentication from "../useAuthentication";
import axiosInstance from "./axiosInstance";
import { hasGetMethod } from "./constants/uriConst";

const useApi = () => {
  const axios = axiosInstance();
  const auth = useAuthentication();
  const dispatch = useDispatch();

  const requestConfig = async (config) => {
    const idToken = await auth.getidToken();
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

  const responseSuccessHandler = (response) => {
    if (!hasGetMethod(response.config.url)) return response; // do nothing whene api don't have GET method.

    const responseData = {
      url: response.config.url,
      data: response.data.result,
    };
    switch (response.config.method) {
      case "get":
        dispatch(updateData(responseData));
        break;
      case "post":
        dispatch(addData(responseData));
        break;
      default:
    }

    return response;
  };

  axios.interceptors.request.use(requestConfig);
  axios.interceptors.response.use(responseSuccessHandler, respnoseErrorHandler);

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
