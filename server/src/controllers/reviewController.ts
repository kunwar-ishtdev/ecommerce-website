import { Request, Response } from 'express';
import Review from '../models/Review';
import { AuthRequest } from '../middleware/authMiddleware';

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const { rating, comment, productId } = req.body;

    const alreadyReviewed = await Review.findOne({
      userId: req.user._id,
      productId: productId
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }

    const review = await Review.create({
      userId: req.user._id,
      productId,
      rating: Number(rating),
      comment
    });

    res.status(201).json(review);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate('userId', 'name');
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
