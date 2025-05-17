const Review = require("../models/Review");

exports.review = async (req, res) => {
  try {
    const {
      id,
      userId,
      author,
      comment,
      createdAt,
      dislikes,
      likes,
      matchId,
      rating,
    } = req.body;

    // Create and save review
    const newReview = new Review({
      id,
      userId,
      author,
      comment,
      createdAt,
      dislikes,
      likes,
      matchId,
      rating,
    });

    await newReview.save();

    console.log("✅ Review saved to MongoDB:", newReview);
    res.status(201).json({ message: "Reviewed successful" });
  } catch (error) {
    console.error("❌ Review Saving error:", error);
    res.status(500).json({ error: error.message });
  }
};
