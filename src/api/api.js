import axios from "axios";
import handleError from "../utils/handleError";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan Bearer token secara otomatis
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const session = localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : {};
    const token = session.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Pasang handleError sebagai response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => handleError(error)
);

export default api;
