import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"; // your Django backend

const api = axios.create({
  baseURL: BASE_URL,
});

// helper to set token after login
export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
