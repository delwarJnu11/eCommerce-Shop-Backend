const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      enum: ["BDT", "USD", "EURO"],
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    cartProductDetails: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      required: true,
    },
    transactionStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
