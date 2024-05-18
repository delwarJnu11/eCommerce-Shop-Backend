const { default: mongoose } = require("mongoose");
const Cart = require("../../models/cartModel");
const Order = require("../../models/orderModel");

const paymentSuccessController = async (req, res) => {
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
      `http://localhost:5173/payment/success/${req.params.transactionId}`
    );
  } else {
    res.status(400).json({ message: "Payment update failed", error: true });
  }
};

module.exports = paymentSuccessController;
