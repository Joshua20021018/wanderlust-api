import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

connectDB();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('🌍 Wanderlust Travel API is running!');
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
