import { Request, Response } from 'express';
import Hotel from '../models/hotelModel';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const createHotel = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ message: 'Create hotel failed', error: err });
  }
};

export const getHotels = async (_req: Request, res: Response): Promise<void> => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Get hotels failed', error: err });
  }
};

export const updateHotel = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) {
      res.status(404).json({ message: 'Hotel not found' });
      return;
    }
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ message: 'Update hotel failed', error: err });
  }
};

export const deleteHotel = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      res.status(404).json({ message: 'Hotel not found' });
      return;
    }
    res.status(200).json({ message: 'Hotel deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete hotel failed', error: err });
  }
};