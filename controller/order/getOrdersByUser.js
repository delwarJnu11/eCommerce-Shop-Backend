const Order = require("../../models/orderModel");

const getOrdersByUserController = async (req, res) => {
  const { email } = req.params;

  try {
    const orders = await Order.find({ email }).populate(
      "cartProductDetails.productId"
    );
    if (orders.length === 0) {
      return res.status(404).json({
        message: `No orders found for this user ${email}`,
        success: false,
        error: true,
      });
    }
    res.status(200).json({
      message: "Orders found!",
      success: true,
      error: false,
      orders: orders,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = getOrdersByUserController;
