import express from 'express';
import { upload, uploadImage } from '../controllers/uploadController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), uploadImage);

export default router;
