import axios from "axios";

export const api = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Normal response return karo
    return response;
  },
  (error) => {
    // Agar error hai
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // JWT invalid ya token missing
        alert("Session expired. Redirecting to login...");
        window.location.href = "/login"; // page refresh ya redirect
      }
    }
    return Promise.reject(error);
  }
);
