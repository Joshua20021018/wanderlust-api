import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

console.log('🔧 Upload routes file loaded');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory at:', uploadsDir);
} else {
  console.log('📁 Uploads directory exists at:', uploadsDir);
}

// 設定儲存方式
const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log('📁 Multer destination called');
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    console.log('📝 Multer filename called for:', file.originalname);
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${cleanName}`;
    console.log('📝 Generated filename:', filename);
    cb(null, filename);
  },
});

const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/pjpeg'];

const fileFilter = (req: any, file: any, cb: any) => {
  console.log('🔍 File filter called for:', {
    originalname: file.originalname,
    mimetype: file.mimetype
  });
  
  const hasValidMimeType = allowedMimeTypes.includes(file.mimetype);
  const hasValidExtension = /\.(jpeg|jpg|png)$/i.test(file.originalname);
  
  if (hasValidMimeType && hasValidExtension) {
    console.log('✅ File validation passed');
    cb(null, true);
  } else {
    console.log('❌ File validation failed');
    cb(new Error(`Invalid file type: ${file.mimetype}`));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

// 🔧 Simple test route first
router.get('/test', (req, res) => {
  console.log('✅ Upload test route hit');
  res.json({ message: 'Upload routes are working!', timestamp: new Date().toISOString() });
});

// 🔧 Debug route to check multer middleware
router.post('/debug', (req, res) => {
  console.log('🔧 Upload debug route hit');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  res.json({ 
    message: 'Debug route working',
    contentType: req.headers['content-type'],
    hasFile: !!req.file
  });
});

// ✅ Main upload route with detailed logging
router.post('/image', upload.single('image'), (req, res) => {
  console.log('📤 Upload image route hit');
  console.log('Request file:', req.file);
  console.log('Request body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);

  if (!req.file) {
    console.log('❌ No file uploaded');
    return res.status(400).json({ 
      message: 'No file uploaded',
      details: 'Make sure to use "image" as the form field name and select a valid image file (JPEG, JPG, PNG)',
      contentType: req.headers['content-type']
    });
  }

  // Verify file was actually saved
  const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
  console.log('📁 Checking file at:', filePath);
  
  if (!fs.existsSync(filePath)) {
    console.error('❌ File was not saved to disk:', filePath);
    return res.status(500).json({ 
      message: 'File upload failed - file not saved',
      expectedPath: filePath
    });
  }

  console.log('✅ File uploaded successfully:', {
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
});

// Log all routes in this router
console.log('🔧 Upload routes registered:');
router.stack?.forEach((layer: any) => {
  if (layer.route) {
    console.log(`  ${Object.keys(layer.route.methods).join(', ').toUpperCase()} /upload${layer.route.path}`);
  }
});

export default router;
