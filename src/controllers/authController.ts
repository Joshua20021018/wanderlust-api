import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const SIGN_UP_CODE = process.env.SIGN_UP_CODE || 'WANDER123';

// 註冊
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, signUpCode } = req.body;

    if (!username || !password || !signUpCode) {
      res.status(400).json({ message: 'Missing fields' });
      return;
    }

    if (signUpCode !== SIGN_UP_CODE) {
      res.status(401).json({ message: 'Invalid sign up code' });
      return;
    }

    const existing = await User.findOne({ username });
    if (existing) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed, role: 'operator' });

    res.status(201).json({ 
      message: 'User registered', 
      user: { username: user.username, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// 登入
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      token, 
      user: { username: user.username, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};