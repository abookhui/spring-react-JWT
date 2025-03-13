import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:8080/login", { username, password }, { withCredentials: true });
            setToken(response.headers["authorization"]);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8080/logout", {}, { withCredentials: true });
            setToken(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post("http://localhost:8080/reissue", {}, { withCredentials: true });
            setToken(response.headers["authorization"]);
        } catch (error) {
            console.error("Token refresh failed", error);
            logout();
        }
    };

    useEffect(() => {
        if (token) {
            const interval = setInterval(() => {
                refreshAccessToken();
            }, 8000); // 8초마다 토큰 재발급
            return () => clearInterval(interval);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
