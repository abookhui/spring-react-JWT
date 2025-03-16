import React, { useEffect, useState } from "react";
import api from "../api";
<<<<<<< Updated upstream
=======
//import axios from "axios";
import { useNavigate } from 'react-router-dom';



>>>>>>> Stashed changes

const Mypage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMypage = async () => {
      try {
        const response = await api.get("/mypage");
        setUser(response.data.username);
      } catch (error) {
        console.error("인증 실패:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchMypage();
  }, []);

  const handleReissue = async (e) => {
    e.preventDefault();
    try {
<<<<<<< Updated upstream
        const response = await api.post("/reissue", {}, { withCredentials: true });
        const accessToken = response.headers["authorization"];
        if (accessToken) {
            localStorage.setItem("Authorization", accessToken); 
=======
      // 디버깅을 위해 axios 직접 사용
      //const response = await axios.post("http://localhost:8080/api/reissue", {}, {
      const response = await api.post("/api/reissue", {}, {

        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
>>>>>>> Stashed changes
        }

    } catch (error) {
        alert("재발급 실패");
    }
  };

  const handleLogout = async () => {

    try {
      await api.post("/logout");
      localStorage.removeItem("Authorization");
    
      alert("로그아웃 성공");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패");
    }
  }

  return (
    <div>
      <h2>마이페이지</h2>
      {loading ? <p>로딩 중...</p> : user ? <p>안녕하세요, {user}님</p> : <p>유저 정보를 불러올 수 없습니다.</p>}

<<<<<<< Updated upstream
      <form onSubmit={handleReissue}>
     
     <button type="submit">재발급</button>
   </form>
   
=======
      <button onClick={handleLogout}>로그아웃</button>

      <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <h3>토큰 디버깅</h3>
        <button onClick={updateDebugInfo}>디버깅 정보 갱신</button>
        <button onClick={checkCookies} style={{ marginLeft: "10px" }}>쿠키 확인</button>
        
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleManualReissue}>수동 토큰 재발급 (디버깅)</button>
          <button 
            onClick={testProtectedRequest} 
            style={{ marginLeft: "10px" }}
          >
            보호된 API 테스트
          </button>
        </div>
        
        <div style={{ marginTop: "10px", maxHeight: "200px", overflow: "auto" }}>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default Mypage;
