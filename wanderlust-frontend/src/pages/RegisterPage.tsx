import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '', signUpCode: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', form);
      setMessage('✅ 註冊成功，請登入');
    } catch (err: any) {
      setMessage('❌ 註冊失敗：' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>註冊帳號</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="使用者名稱" onChange={handleChange} required />
        <input name="password" type="password" placeholder="密碼" onChange={handleChange} required />
        <input name="signUpCode" placeholder="註冊碼" onChange={handleChange} required />
        <button type="submit">註冊</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegisterPage;
