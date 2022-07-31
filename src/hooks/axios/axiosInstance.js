import axios from "axios";

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10000, // set timeout for 10 second.
  });
  return instance;
};

export default axiosInstance;
