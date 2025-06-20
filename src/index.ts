import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// ✅ 初始化環境變數
dotenv.config();

// ✅ 建立 express app（⚠️ 放在最前面）
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 載入 Swagger 文件
const swaggerDocument = YAML.load('./src/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ 連接 MongoDB
connectDB();

// ✅ 中介軟體
app.use(cors());
app.use(express.json());

// ✅ API 路由
app.use('/auth', authRoutes);

// ✅ 測試首頁
app.get('/', (req, res) => {
  res.send('🌍 Wanderlust Travel API is running!');
});

// ✅ 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
