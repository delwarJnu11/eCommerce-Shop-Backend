const SSLCommerzPayment = require("sslcommerz-lts");
const Cart = require("../../models/cartModel");
const { default: mongoose } = require("mongoose");
const Order = require("../../models/orderModel");
const generateTrxId = require("../../helpers/generateTrxId");
require("dotenv").config();
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

const orderCreateController = async (req, res) => {
  const currentUser = req.userId;

  const {
    name,
    email,
    currency,
    postalCode,
    phone,
    address,
    cartProductDetails,
  } = req.body;

  console.log(cartProductDetails);

  // Find all cart products for the user
  const cartProducts = await Cart.find({
    userId: new mongoose.Types.ObjectId(currentUser),
  }).populate("productId");

  const totalPrice = cartProducts.reduce(
    (prev, curr) => prev + curr?.productId?.sellingPrice * curr.quantity,
    0
  );

  const transactionId = generateTrxId(8);

  //order payload
  const orderData = {
    customerName: name,
    email: email,
    address: address,
    phone: phone,
    currency: currency,
    postalCode: postalCode,
    cartProductDetails: cartProductDetails,
    totalPrice: totalPrice,
    transactionId: transactionId,
    paymentStatus: "pending",
  };

  // payment data
  const data = {
    total_amount: totalPrice,
    currency: currency,
    tran_id: transactionId, // use unique tran_id for each api call
    success_url: `http://localhost:8000/api/payment/success/${transactionId}`,
    fail_url: `http://localhost:8000/api/payment/fail/${transactionId}`,
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: name,
    cus_email: email,
    cus_add1: address,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: postalCode,
    cus_country: "Bangladesh",
    cus_phone: phone,
    cus_fax: "01711111111",
    ship_name: name,
    ship_add1: address,
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: postalCode,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  try {
    const apiResponse = await sslcz.init(data);
    let GatewayPageURL = apiResponse.GatewayPageURL;

    // Add payment status to orderData
    orderData.transactionStatus = apiResponse.status;

    // Add to db
    const newOrder = new Order(orderData);
    await newOrder.save();

    // Delete user cart item
    await Cart.deleteMany({
      userId: new mongoose.Types.ObjectId(currentUser),
    });

    res.send({ url: GatewayPageURL });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = orderCreateController;
