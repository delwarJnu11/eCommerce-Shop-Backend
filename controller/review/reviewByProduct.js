const { default: mongoose } = require("mongoose");
const Review = require("../../models/reviewModel");

const reviewByProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.json({ message: "Product ID is required!" });
    }
    //find reviews by product id
    const reviews = await Review.find({
      productId: new mongoose.Types.ObjectId(productId),
    });
    //check reviews found or not
    if (reviews.length === 0) {
      return res.status(404).json({
        message: "No review found!",
        error: true,
        success: false,
        reviews: [],
      });
    } else {
      res.status(200).json({
        message: "Review found successfully!!!",
        success: true,
        error: false,
        reviews: reviews,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
module.exports = reviewByProductController;
