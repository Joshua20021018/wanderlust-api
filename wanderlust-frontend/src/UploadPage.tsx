import React, { useState } from 'react';
import axios from 'axios';

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('請先選擇圖片');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`上傳成功：${res.data.filePath}`);
    } catch (error) {
      setMessage('上傳失敗');
    }
  };

  return (
    <div>
      <h2>圖片上傳</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="預覽" style={{ width: 200 }} />}
      <button onClick={handleUpload}>上傳</button>
      <p>{message}</p>
    </div>
  );
};

export default UploadPage;
