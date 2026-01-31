import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082",
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token && !config.url?.startsWith("/auth")) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
