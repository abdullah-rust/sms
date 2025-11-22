import axios from "axios";

export const api = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        alert("Session expired. Redirecting to login...");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
