import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Clean the filename to avoid issues
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${Date.now()}-${cleanName}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  console.log('File received:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size
  });

  // More comprehensive MIME type checking
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/pjpeg' // Progressive JPEG
  ];
  
  const allowedExtensions = /\.(jpeg|jpg|png)$/i;
  
  const hasValidMimeType = allowedMimeTypes.includes(file.mimetype);
  const hasValidExtension = allowedExtensions.test(file.originalname);
  
  console.log('Validation:', {
    hasValidMimeType,
    hasValidExtension,
    mimetype: file.mimetype,
    extension: path.extname(file.originalname).toLowerCase()
  });

  if (hasValidMimeType && hasValidExtension) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed: JPEG, JPG, PNG. Received: ${file.mimetype}`));
  }
};

const upload = multer({
  storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  },
  fileFilter,
});

export default upload;
