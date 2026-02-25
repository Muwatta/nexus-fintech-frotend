import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // your DRF base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("✅ Auth token set");
  } else {
    delete api.defaults.headers.common["Authorization"];
    console.log("❌ Auth token removed");
  }
};

// Add response interceptor for better error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error(
        "🌐 Network Error: Backend not reachable at http://127.0.0.1:8000",
      );
    } else if (error.response?.status === 401) {
      console.error("🔐 Unauthorized: Invalid or expired token");
    } else if (error.response?.status === 403) {
      console.error("🚫 Forbidden: Access denied");
    } else {
      console.error(
        "❌ API Error:",
        error.response?.status,
        error.response?.data,
      );
    }
    return Promise.reject(error);
  },
);

export default api;
