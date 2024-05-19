const Order = require("../../models/orderModel");

const updateOrderStatusController = async (req, res) => {
  const { orderId } = req.params;
  const { newStatus } = req.body;

  if (!newStatus) {
    return res.status(400).json({ message: "New status is required" });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order status
    order.orderStatus = newStatus;
    order.statusHistory.push({ status: newStatus, updatedAt: new Date() });

    await order.save();

    res.status(200).json({
      message: `Order ${newStatus} successfully`,
      success: true,
      error: false,
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = updateOrderStatusController;
