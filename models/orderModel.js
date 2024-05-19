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
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Dispatched",
        "In Transit",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      required: true,
      default: "Pending",
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: [
            "Pending",
            "Confirmed",
            "Dispatched",
            "In Transit",
            "Delivered",
            "Cancelled",
            "Returned",
          ],
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Event listener to update statusHistory
orderSchema.post("save", (doc) => {
  if (doc.isModified("orderStatus")) {
    doc.statusHistory.push({ status: doc.orderStatus, updatedAt: new Date() });
    doc.save();
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
