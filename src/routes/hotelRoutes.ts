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
router.post('/', protect, createHotel);
router.put('/:id', protect, updateHotel);
router.delete('/:id', protect, deleteHotel);

export default router;
