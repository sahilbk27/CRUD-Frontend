import axios from "axios";

// Change this if your backend runs on a different host/port
const client = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT to every outgoing request, if we have one
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("tdc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is missing/expired, the backend returns 401 -> bounce to login
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("tdc_token");
      localStorage.removeItem("tdc_username");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default client;
