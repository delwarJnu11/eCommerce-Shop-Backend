const productUploadPermission = require("../../helpers/productUploadPermission");
const Product = require("../../models/productModel");

const updateProductController = async (req, res) => {
  try {
    const sessionUser = req.userId;
    const hasPermission = productUploadPermission(sessionUser);
    if (!hasPermission) {
      return res.json({
        message:
          "you can not update the product. you do not have any permission.",
      });
    }
    const { id } = req.params;
    const productToUpdate = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, productToUpdate);
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "product updated successfull",
      success: true,
      error: false,
      product: updatedProduct,
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateProductController;
