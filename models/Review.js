const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    matchId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    dislikes: {
      type: Number,
    },
    likes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
