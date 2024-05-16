const { default: mongoose } = require("mongoose");
const Cart = require("../../models/cartModel");

const updateCartProductController = async (req, res) => {
  try {
    const { _id, quantity } = req.body;

    const updateCartdProduct = await Cart.updateOne(
      { _id: new mongoose.Types.ObjectId(_id) },
      { ...(quantity && { quantity: quantity }) }
    );

    return res.status(200).json({
      message: "quantity upated successfully done!",
      success: true,
      error: false,
      updateProduct: updateCartdProduct,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateCartProductController;
