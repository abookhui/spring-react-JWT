import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { username, password });
      
      // Get token from response headers
      const accessToken = response.headers["authorization"];
      
      if (accessToken) {
        // Store token as-is, our interceptor will handle formatting
        localStorage.setItem("Authorization", accessToken);
        console.log("로그인 성공, 토큰 저장됨:", accessToken);
        navigate("/mypage");
      } else {
        alert("토큰이 없습니다. 서버 응답을 확인하세요.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패");
    }
  };
  
  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;