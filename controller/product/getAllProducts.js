const Product = require("../../models/productModel");

const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviews.rating" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    res.status(200).json({
      message: "products successfully retrieve",
      error: false,
      success: true,
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
      products: [],
    });
  }
};

module.exports = getAllProductsController;
