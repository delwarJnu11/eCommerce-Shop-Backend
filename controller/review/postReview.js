const Review = require("../../models/reviewModel");

const createReviewController = async (req, res) => {
  try {
    const { name, email, description, rating, productId } = req.body;
    const reviewPayload = {
      name,
      email,
      description,
      rating,
      productId,
    };
    if (!description) {
      return res.json({ message: "Description is required!" });
    }
    if (!productId) {
      return res.json({ message: "Product ID is required!" });
    }
    if (!rating) {
      return res.json({ message: "Rating is required!" });
    }
    // create review and save
    const review = new Review(reviewPayload);
    await review.save();

    res.status(200).json({
      message: "Review added successfully done!!!",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
module.exports = createReviewController;
