const Product = require("../../models/productModel");

const getProductsByCategoryController = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await Product.find({ categoryName: categoryName });
    if (!products.length) {
      return res.status(404).json({
        message: `${categoryName} category not found!`,
      });
    }
    res.status(200).json({
      message: `${categoryName} category products found successfully!`,
      success: true,
      error: false,
      products: products,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = getProductsByCategoryController;
