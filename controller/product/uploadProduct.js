const productUploadPermission = require("../../helpers/productUploadPermission");
const Product = require("../../models/productModel");

const uploadProductController = async (req, res) => {
  try {
    const sessionUser = req.userId;
    const hasPermission = await productUploadPermission(sessionUser);

    if (!hasPermission) {
      throw new Error("Permission denied!");
    }
    const product = req.body;
    const productToUpload = new Product(product);
    console.log(productToUpload);
    const savedProduct = await productToUpload.save();
    res.status(201).json({
      message: "product uploaded successfull",
      success: true,
      error: false,
      data: savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = uploadProductController;
