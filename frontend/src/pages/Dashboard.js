import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const { token, logout } = useAuth();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/protected", {
                    headers: { Authorization: token },
                });
                setMessage(response.data);
            } catch (error) {
                console.error("Access denied", error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
