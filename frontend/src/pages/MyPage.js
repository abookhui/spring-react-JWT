import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    };

    return (
        <div>
            <h2>My Page</h2>
            <p>환영합니다! 여기는 마이페이지입니다.</p>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default MyPage;
