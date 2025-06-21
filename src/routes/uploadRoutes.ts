import express from 'express';
import upload from '../middleware/uploadMiddleware';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Upload handler function
const uploadProfileHandler = (req: any, res: any): void => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // 可選：更新使用者資料的圖片欄位
  // await User.findByIdAndUpdate(req.userId, { photo: req.file.path })

  res.status(200).json({
    message: 'Image uploaded successfully',
    path: file.path,
  });
};

// POST /upload/profile
router.post('/profile', protect, upload.single('image'), uploadProfileHandler);

export default router;