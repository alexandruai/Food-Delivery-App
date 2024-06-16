import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      maxlength: 60,
    },
    reviewText: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);