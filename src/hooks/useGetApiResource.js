import { useEffect } from "react";
import { useSelector } from "react-redux";
import useApi from "./axios/useApi";

const useGetApiResource = (apiConfig) => {
  const sendApi = useApi();
  const getResource = useSelector((state) => state.apiConfig.url);

  useEffect(() => {
    sendApi(apiConfig);
  }, []);

  return getResource;
};

export default useGetApiResource;
