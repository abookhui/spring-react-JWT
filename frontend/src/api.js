import axios from "axios";

const backendUrl = "http://localhost:8080";
const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace("Bearer ", "")}`;  // Bearer 포함
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //console.log(originalRequest);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await api.post("/reissue", {}, { withCredentials: true }); 
        const newAccessToken = response.headers["authorization"];
        console.log("토큰 재발급 성공:", newAccessToken);
        if (newAccessToken) {
          console.log("1");
          localStorage.setItem("Authorization", newAccessToken);
          console.log("2");
          //originalRequest.headers.Authorization =  `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = newAccessToken;

          console.log("3");
          return api(originalRequest); // 요청 재시도
        }
      } catch (err) {
        console.error("토큰 재발급 실패:", err);
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
