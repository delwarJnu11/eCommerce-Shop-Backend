const Cart = require("../../models/cartModel");

const deleteCartProductController = async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedProduct = await Cart.findOneAndDelete({ _id });

    if (deletedProduct) {
      res.status(200).json({
        message: "Product deleted successfully!",
        success: true,
        error: false,
        deletedProduct: deletedProduct,
      });
    } else {
      res.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteCartProductController;
