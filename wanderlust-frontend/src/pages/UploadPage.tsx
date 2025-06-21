import React, { useState } from 'react';
import API from '../api';

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) {
      alert('請選擇圖片');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('請先登入');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await API.post('/upload/image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setImagePath(response.data.filePath);
      setMessage('✅ 上傳成功');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>圖片上傳</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>上傳</button>
      {message && <p>{message}</p>}
      {imagePath && (
        <div>
          <p>檔案路徑：{imagePath}</p>
          <img src={`http://localhost:5000${imagePath}`} alt="上傳圖片" width="200" />
        </div>
      )}
    </div>
  );
};

export default UploadPage;
