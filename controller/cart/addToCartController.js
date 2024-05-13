const { default: mongoose } = require("mongoose");
const Cart = require("../../models/cartModel");

const addToCartController = async (req, res) => {
  try {
    const sessionUser = req?.userId;
    const { productId } = req.body;

    if (!sessionUser) {
      return res.status(401).json({
        message: "Please log in to add products to the cart.",
        error: true,
        success: false,
      });
    }

    //check product already in the cart or not
    const isAdd = await Cart.findOne({ productId });

    if (isAdd) {
      return res.json({
        message: "product already exists in the cart.",
        success: false,
        error: true,
      });
    }

    const payload = {
      userId: sessionUser,
      productId: productId,
      quantity: 1,
    };

    const newCartProduct = new Cart(payload);
    newCartProduct.save();

    res.status(200).json({
      message: "product added in the cart successfully",
      success: true,
      error: false,
      product: newCartProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
