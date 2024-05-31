const { default: mongoose } = require("mongoose");
const Cart = require("../../models/cartModel");
const Order = require("../../models/orderModel");

const paymentSuccessController = async (req, res) => {
  try {
    const order = await Order.updateOne(
      {
        transactionId: req.params.transactionId,
      },
      {
        paymentStatus: "paid",
      }
    );
    if (order.modifiedCount > 0) {
      res.redirect(
        `https://shopee-liard-mu.vercel.app/payment/success/${req.params.transactionId}`
      );
    } else {
      res.status(400).json({ message: "Payment update failed", error: true });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = paymentSuccessController;
