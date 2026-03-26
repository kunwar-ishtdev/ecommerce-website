import express from 'express';
import { createReview, getProductReviews } from '../controllers/reviewController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createReview);

router.route('/:productId')
  .get(getProductReviews);

export default router;
