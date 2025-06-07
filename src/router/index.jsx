// src/router/index.jsx
// Cấu hình router cho ứng dụng React
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../views/Home';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        {/* Thêm các route khác tại đây */}
      </Routes>
    </Router>
  );
}
