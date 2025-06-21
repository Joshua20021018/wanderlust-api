// src/pages/CreateHotelPage.tsx
import React, { useState } from 'react';
import API from '../api';

const CreateHotelPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    pricePerNight: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post('/hotels', {
        name: form.name,
        location: form.location,
        pricePerNight: Number(form.pricePerNight),
        description: form.description,
      });
      setMessage('✅ 酒店建立成功');
    } catch (err: any) {
      setMessage('❌ 酒店建立失敗：' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>新增酒店</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="酒店名稱" onChange={handleChange} required />
        <input name="location" placeholder="地點" onChange={handleChange} required />
        <input name="pricePerNight" type="number" placeholder="每晚價格" onChange={handleChange} required />
        <textarea name="description" placeholder="描述" onChange={handleChange} required />
        <button type="submit">建立酒店</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreateHotelPage;
