import express from 'express';
import upload from '../middleware/uploadMiddleware';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/upload-avatar', protect, upload.single('avatar'), (req, res) => {
  if (req.file) {
    res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

export default router;
