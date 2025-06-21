import React, { useEffect, useState } from 'react';
import API from '../api';

interface Hotel {
  _id: string;
  name: string;
  location: string;
  pricePerNight: number;
  description: string;
  image?: string;
}

const HotelListPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('❌ 請先登入');
        return;
      }

      try {
        const response = await API.get('/hotels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHotels(response.data);
      } catch (err: any) {
        console.error(err);
        setError('❌ 無法取得酒店資料');
      }
    };

    fetchHotels();
  }, []);

  return (
    <div>
      <h2>🏨 酒店列表</h2>
      {error && <p>{error}</p>}
      {hotels.map((hotel) => (
        <div key={hotel._id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
          <h3>{hotel.name}</h3>
          <p>📍 地點：{hotel.location}</p>
          <p>💰 每晚價格：${hotel.pricePerNight}</p>
          <p>{hotel.description}</p>
          {hotel.image && (
            <img src={`http://localhost:5000${hotel.image}`} alt={hotel.name} width="200" />
          )}
        </div>
      ))}
    </div>
  );
};

export default HotelListPage;
