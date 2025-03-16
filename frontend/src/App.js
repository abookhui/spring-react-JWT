import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Mypage from "./pages/MyPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </Router>
  );
};

export default App;
