import axios from "axios";

const backendUrl = "http://localhost:8080";
<<<<<<< Updated upstream
const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

=======

// 일반 요청 axios 인스턴스
const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true // 쿠키 항상 전송
});

// 토큰 재발급 전용 axios 인스턴스 (인터셉터 없음)
const refreshApi = axios.create({
  baseURL: backendUrl,
  withCredentials: true
});

// 토큰 재발급이 진행 중인지 확인
let isRefreshing = false;

// 토큰 재발급 대기 중인 요청들의 큐
let failedQueue = [];


// 큐에 있는 요청들을 처리
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// 요청 인터셉터
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
        console.log("토큰 재발급 시도...");
        const response = await refreshApi.post("/api/reissue");
        const newToken = response.headers["authorization"];
        
        if (newToken) {
          console.log("토큰 재발급 성공:", newToken);
          localStorage.setItem("Authorization", newToken);
          
          // 원본 요청 헤더 업데이트
          originalRequest.headers.Authorization = newToken;
          
          // 대기 중인 요청들 처리
          processQueue(null, newToken);
          
          return axios(originalRequest);
        } else {
          console.error("토큰 재발급 응답에 토큰이 없음");
          processQueue(new Error("토큰 재발급 실패"));
          return Promise.reject(error);
>>>>>>> Stashed changes
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
