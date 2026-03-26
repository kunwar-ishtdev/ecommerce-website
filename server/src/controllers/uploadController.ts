import multer from 'multer';
import { AuthRequest } from '../middleware/authMiddleware';
import { Response } from 'express';
import Image from '../models/Image';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    // Convert buffer to base64
    const base64Data = req.file.buffer.toString('base64');
    const contentType = req.file.mimetype || 'image/jpeg';

    // Create new image document
    const newImage = new Image({
      filename: req.file.originalname,
      data: `data:${contentType};base64,${base64Data}`,
      contentType: contentType,
      size: req.file.size,
      uploadedBy: req.user?._id,
    });

    const savedImage = await newImage.save();

    res.json({ 
      url: savedImage.data,
      _id: savedImage._id,
      filename: savedImage.filename 
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message || 'Upload failed' });
  }
};
