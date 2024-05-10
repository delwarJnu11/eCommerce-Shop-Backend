const Product = require("../../models/productModel");

const getAllProductCategoryController = async (req, res) => {
  try {
    const productCategory = await Product.distinct("categoryName");

    const productByCategory = [];

    for (const category of productCategory) {
      const product = await Product.findOne({ categoryName: category });
      if (product) {
        productByCategory.push(product);
      }
    }

    res.status(200).json({
      message: "category base product get successfull",
      success: true,
      error: false,
      data: productByCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = getAllProductCategoryController;
