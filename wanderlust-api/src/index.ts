export {};

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import hotelRoutes from './routes/hotelRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import userRoutes from './routes/userRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { Request, Response } from 'express';

// ✅ 初始化環境變數
dotenv.config();

// ✅ 創建 uploads 目錄（如果不存在）
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

// ✅ 建立 express app（⚠️ 放在最前面）
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 連接 MongoDB
connectDB();

// ✅ 中介軟體 - 這些必須在路由之前設定
app.use(cors());
app.use(express.json());

// ✅ 靜態檔案服務
app.use('/uploads', express.static('uploads'));

// ✅ 載入 Swagger 文件
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ API 路由 - 確保正確的順序
app.use('/auth', authRoutes);
app.use('/hotels', hotelRoutes);  // 這個路由現在應該能正常工作
app.use('/user', userRoutes);
app.use('/upload', uploadRoutes);

// ✅ 測試首頁
app.get('/', (req: Request, res: Response) => {
  res.send('🌍 Wanderlust Travel API is running!');
});

// ✅ 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
