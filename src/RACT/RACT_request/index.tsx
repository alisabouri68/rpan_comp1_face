import axios from "axios";

const SessionUrl =
  import.meta.env.VITE_SESSIONBRO_API_ADDRESS +
  ":" +
  import.meta.env.VITE_SESSIONBRO_API_PORT +
  "/users";
export const loginApi = axios.create({ baseURL: SessionUrl });

// set token
loginApi.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("access_token");
    if (accessToken) config.headers.authorization = accessToken;
    return config;
  },
  (error) => Promise.reject(error)
);

const BroUrl =
  import.meta.env.VITE_OBRO_ADDRESS +
  ":" +
  import.meta.env.VITE_OBRO_PORT +
  "/";

export const BroApi = axios.create({ baseURL: BroUrl });

// set token
BroApi.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("access_token");
    if (accessToken) config.headers.authorization = accessToken;
    return config;
  },
  (error) => Promise.reject(error)
);
