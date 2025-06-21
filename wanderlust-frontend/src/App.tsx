import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import CreateHotelPage from './pages/CreateHotelPage';
import PrivateRoute from './components/PrivateRoute';
import HotelListPage from './pages/HotelListPage';
const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/register">註冊</Link> |{" "}
        <Link to="/login">登入</Link> |{" "}
        <Link to="/upload">上傳圖片</Link> |{" "}
        <Link to="/create-hotel">新增酒店</Link>
        <Link to="/hotels">酒店列表</Link> |{" "}
      </nav>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload" element={
          <PrivateRoute>
            <UploadPage />
          </PrivateRoute>
        } />
        <Route path="/create-hotel" element={
          <PrivateRoute>
            <CreateHotelPage />
          </PrivateRoute>
        } />
        <Route path="/" element={<div>🌍 歡迎來到 Wanderlust Travel 前端</div>} />
        <Route path="*" element={<div>❌ 找不到頁面</div>} />
        <Route path="/hotels" element={<HotelListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
