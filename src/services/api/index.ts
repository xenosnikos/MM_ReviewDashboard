import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      const { remember_token } = JSON.parse(user);
      config.headers["Authorization"] = `Bearer ${remember_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
