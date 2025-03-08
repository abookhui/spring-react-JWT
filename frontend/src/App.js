import './App.css';
import Hello from "./page/Hello";
import Home from "./page/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/hello" element={<Hello/>} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
