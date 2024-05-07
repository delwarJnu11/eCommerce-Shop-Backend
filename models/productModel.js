const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    productImages: [],
    price: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
