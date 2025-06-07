// src/services/api.js
// Cấu hình các hàm gọi API
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Thay đổi nếu cần
});

export default api;
