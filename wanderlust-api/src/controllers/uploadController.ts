import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const uploadImage = (req: Request, res: Response): void => {
  console.log('Upload controller called');
  console.log('Request file:', req.file);
  console.log('Request body:', req.body);

  if (!req.file) {
    res.status(400).json({ 
      message: 'No file uploaded',
      details: 'Make sure to use "image" as the form field name and select a valid image file (JPEG, JPG, PNG)'
    });
    return;
  }

  // Verify file was actually saved
  const filePath = path.join(__dirname, '../uploads', req.file.filename);
  if (!fs.existsSync(filePath)) {
    console.error('File was not saved to disk:', filePath);
    res.status(500).json({ 
      message: 'File upload failed - file not saved' 
    });
    return;
  }

  console.log('File uploaded successfully:', {
    filename: req.file.filename,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: filePath
  });

  res.status(200).json({
    message: 'Upload successful',
    filePath: `/uploads/${req.file.filename}`,
    fileInfo: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size
    }
  });
};