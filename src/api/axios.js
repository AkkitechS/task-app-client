import axios from "axios";
import { decrypt } from "../utils/crypt";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "x-api-key": import.meta.env.VITE_API_SECRET_KEY,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(decrypt(token));
    config.headers.Authorization = `Bearer ${decodedToken.accessToken}`;
    // config.headers["x-api-key"] = import.meta.env.VITE_API_SECRET_KEY;
  }
  return config;
});

export default api;
