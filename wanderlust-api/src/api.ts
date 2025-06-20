// src/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// 自動加上 token (檢查 localStorage 是否可用)
API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default API;