import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadImage } from '../controllers/uploadController';

const router = express.Router();

// 設定上傳儲存位置
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 設定路由
router.post('/', upload.single('image'), uploadImage);

export default router;
