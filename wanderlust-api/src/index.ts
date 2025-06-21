export {};

import express, { Request, Response } from 'express';
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

// Initialize environment variables
dotenv.config();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Static file serving
app.use('/uploads', express.static('uploads'));

// Swagger documentation
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use('/auth', authRoutes);
app.use('/hotels', hotelRoutes);
app.use('/user', userRoutes);
app.use('/upload', uploadRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('🌍 Wanderlust Travel API is running!');
});

// Test route for upload
app.get('/upload/test', (req: Request, res: Response) => {
  res.json({ message: 'Upload route is accessible!' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📄 API documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🧪 Test upload: http://localhost:${PORT}/upload/test`);
});
