import { Request, Response } from 'express';
import Hotel from '../models/hotelModel';

// 取得所有酒店
export const getHotels = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 新增酒店（需要登入）
export const createHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ message: 'Create hotel failed', error });
  }
};

// 更新酒店資訊（需要登入）
export const updateHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!hotel) {
      res.status(404).json({ message: 'Hotel not found' });
      return;
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Update hotel failed', error });
  }
};

// 刪除酒店（需要登入）
export const deleteHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      res.status(404).json({ message: 'Hotel not found' });
      return;
    }

    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete hotel failed', error });
  }
};
