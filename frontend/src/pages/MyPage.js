import React, { useEffect, useState } from "react";
import api from "../api";

const Mypage = () => {
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
        const response = await api.post("/reissue", {}, { withCredentials: true });
        const accessToken = response.headers["authorization"];
        if (accessToken) {
            localStorage.setItem("Authorization", accessToken); 
        }

    } catch (error) {
        alert("재발급 실패");
    }
  };

  return (
    <div>
      <h2>마이페이지</h2>
      {loading ? <p>로딩 중...</p> : user ? <p>안녕하세요, {user}님</p> : <p>유저 정보를 불러올 수 없습니다.</p>}

      <form onSubmit={handleReissue}>
     
     <button type="submit">재발급</button>
   </form>
   
    </div>
  );
};

export default Mypage;
