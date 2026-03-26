import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      default: 'image/jpeg',
    },
    size: {
      type: Number,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model('Image', imageSchema);

export default Image;
