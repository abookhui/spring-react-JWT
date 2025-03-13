import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true, // 쿠키 기반 인증을 사용할 경우 필요
});

export default api;
