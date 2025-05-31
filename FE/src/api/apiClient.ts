import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  (config) => {
    // console.log(localStorage.getItem("userPersist"));
    const token = localStorage.getItem("userPersist")
      ? JSON.parse(localStorage.getItem("userPersist")!).userState.token
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
