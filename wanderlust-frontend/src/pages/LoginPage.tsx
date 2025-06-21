import React, { useState } from 'react';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', form);
      const jwt = res.data.token;
      setToken(jwt);
      localStorage.setItem('token', jwt);
      setMessage('✅ 登入成功');
    } catch (err: any) {
      setMessage('❌ 登入失敗：' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>登入</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="使用者名稱" onChange={handleChange} required />
        <input name="password" type="password" placeholder="密碼" onChange={handleChange} required />
        <button type="submit">登入</button>
      </form>
      <p>{message}</p>
      {token && <p>JWT Token: {token}</p>}
    </div>
  );
};

export default LoginPage;
