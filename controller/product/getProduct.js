const Product = require("../../models/productModel");

const getSingleProductDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: `product not found with id ${id}`,
      });
    }
    res.status(200).json({
      meesage: "product successfully found",
      error: false,
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
module.exports = getSingleProductDetailsController;
