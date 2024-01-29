import axios from "axios";

//apply base url for axios
const REACT_APP_APP_URL = process.env.REACT_APP_APP_URL;
console.log("REACT_APP_APP_URL: ", REACT_APP_APP_URL);
const axiosApi = axios.create({
  baseURL: `http://13.201.35.252:8000`,
});

axios.interceptors.request.use(function (config) {
  return config;
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config) {
  return await axiosApi
    .get(url, {
      ...config,
    })
    .then((response) => response.data);
}