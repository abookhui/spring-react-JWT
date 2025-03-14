import React, { useEffect, useState } from "react";
import api from "../api";
import axios from "axios";

const Mypage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const fetchMypage = async () => {
      try {
        const response = await api.get("/mypage");
        setUser(response.data.username);
        console.log("마이페이지 로드 성공");
      } catch (error) {
        console.error("인증 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMypage();
  }, []);

  // 디버깅 정보 갱신
  const updateDebugInfo = () => {
    const auth = localStorage.getItem("Authorization");
    setDebugInfo({
      currentToken: auth || "없음",
      tokenLength: auth ? auth.length : 0,
      lastRefreshTime: lastRefresh || "없음",
      localStorage: { ...localStorage }
    });
  };

  // 쿠키 확인 함수
  const checkCookies = () => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    alert(`현재 쿠키: ${cookies.length ? cookies.join(', ') : '없음'}`);
  };

  const handleManualReissue = async () => {
    try {
      // 디버깅을 위해 axios 직접 사용
      const response = await axios.post("http://localhost:8080/reissue", {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("수동 재발급 응답:", response);
      
      // 응답 헤더 확인
      const headers = response.headers;
      console.log("응답 헤더:", headers);
      
      const newToken = headers["authorization"];
      if (newToken) {
        localStorage.setItem("Authorization", newToken);
        setLastRefresh(new Date().toLocaleTimeString());
        alert(`토큰 재발급 성공! 새 토큰: ${newToken.substring(0, 20)}...`);
      } else {
        alert("재발급 응답에 토큰이 없습니다!");
        console.log("모든 응답 헤더:", Object.keys(headers).map(key => `${key}: ${headers[key]}`));
      }
      
      updateDebugInfo();
    } catch (error) {
      console.error("수동 재발급 실패:", error);
      alert(`재발급 실패: ${error.message}`);
      
      if (error.response) {
        console.log("에러 응답:", error.response);
        console.log("에러 상태:", error.response.status);
        console.log("에러 데이터:", error.response.data);
      }
    }
  };

  const testProtectedRequest = async () => {
    try {
      const response = await api.get("/mypage");
      alert(`요청 성공: ${response.data.username}`);
      updateDebugInfo();
    } catch (error) {
      console.error("테스트 요청 실패:", error);
      alert(`요청 실패: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>마이페이지</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : user ? (
        <p>안녕하세요, {user}님</p>
      ) : (
        <p>유저 정보를 불러올 수 없습니다.</p>
      )}

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
    </div>
  );
};

export default Mypage;