const { default: mongoose } = require("mongoose");
const Cart = require("../../models/cartModel");

const getCartProductsByUserController = async (req, res) => {
  try {
    const currentUser = req.userId;
    if (!currentUser) {
      return res.status(401).json({
        message: "Please log in to view cart products.",
        error: true,
        success: false,
      });
    }

    // Find all cart products for the user
    const cartProducts = await Cart.find({
      userId: new mongoose.Types.ObjectId(currentUser),
    })
      .populate("productId")
      .populate("userId");

    // Check if the cart is empty
    if (cartProducts.length === 0) {
      return res.status(404).json({
        message: "Your cart is empty. Please add some products.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Successfully retrieved cart products",
      error: false,
      success: true,
      cart: cartProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

module.exports = getCartProductsByUserController;
