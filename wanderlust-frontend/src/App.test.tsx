import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/register">註冊</Link> | <Link to="/login">登入</Link> | <Link to="/upload">上傳圖片</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/" element={<div>🌍 歡迎來到 Wanderlust Travel 前端</div>} />
      </Routes>
    </Router>
  );
};

export default App;