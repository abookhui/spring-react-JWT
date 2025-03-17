import axios from "axios";

function NaverLogin() {
    const handleNaverLogin = async () => {
        try {
            // 네이버 로그인 URL 가져오기
            const response = await axios.get("http://localhost:8080/api/auth/naver");
            window.location.href = response.data; // 네이버 로그인 페이지로 이동
        } catch (error) {
            console.error("네이버 로그인 URL 요청 실패:", error);
        }
    };

    return (
        <div className="oauth-container">
            <h2>소셜 로그인</h2>
            <div className="oauth-buttons">
                <button 
                    className="btn-naver" 
                    onClick={handleNaverLogin} 
                    style={{ 
                        backgroundColor: '#03C75A', 
                        color: 'white', 
                        padding: '10px 20px', 
                        margin: '5px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer' 
                    }}
                >
                    네이버 로그인
                </button>
            </div>
        </div>
    );
}

export default NaverLogin;
