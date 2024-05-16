const Product = require("../../models/productModel");

const getSearchProductsController = async (req, res) => {
  try {
    const query = req.query.q;
    const convertedQuery = new RegExp(query, "i", "g");
    const products = await Product.find({
      $or: [
        {
          productName: convertedQuery,
        },
        {
          categoryName: convertedQuery,
        },
      ],
    });
    res.status(200).json({
      message: "your search result found!",
      success: true,
      error: false,
      products: products,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = getSearchProductsController;
