import express from 'express';

import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from '../controllers/hotelController';
import { protect } from '../middleware/authMiddleware'; 

const router = express.Router();

router.get('/', getHotels); 

router.post('/', protect, createHotel); // 需要登入
router.put('/:id', protect, updateHotel); // 需要登入
router.delete('/:id', protect, deleteHotel); // 需要登入

export default router;
