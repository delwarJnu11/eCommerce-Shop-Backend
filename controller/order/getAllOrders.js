const Order = require("../../models/orderModel");
const Product = require("../../models/productModel");

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "cartProductDetails.productId",
      model: Product,
    });

    res.status(200).json({
      message: "All orders get successfully.",
      success: true,
      erro: false,
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getAllOrdersController;
