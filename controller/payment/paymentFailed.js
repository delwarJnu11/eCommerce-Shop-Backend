const Order = require("../../models/orderModel");

const paymentFailedController = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const order = await Order.deleteOne({ transactionId });
    if (order.deletedCount) {
      res.redirect(`http://localhost:5173/payment/fail/${transactionId}`);
    } else {
      res.status(400).json({
        message: "Failed to payment.",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error payment unsuccessfull.",
      error: true,
      success: false,
    });
  }
};
module.exports = paymentFailedController;
