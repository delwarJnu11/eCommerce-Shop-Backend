const express = require("express");
const userLoginController = require("../controller/user/userLogin");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/user/userDetails");
const userLogoutController = require("../controller/user/userLogout");
const getAllUsersController = require("../controller/user/getAllUsers");
const updateUserRoleController = require("../controller/user/updateUserRole");
const userRegisterController = require("../controller/user/userRegister");
const uploadProductController = require("../controller/product/uploadProduct");
const getAllProductsController = require("../controller/product/getAllProducts");
const updateProductController = require("../controller/product/updateProduct");
const getAllProductCategoryController = require("../controller/product/getAllProductCategory");
const getProductsByCategoryController = require("../controller/product/getProductsByCategory");
const getSingleProductDetailsController = require("../controller/product/getProduct");
const addToCartController = require("../controller/cart/addToCartController");
const getCartProductsByUserController = require("../controller/cart/getCartProductsByUser");

const router = express.Router();

// endpoints
router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogoutController);

//admin route
router.get("/users", authToken, getAllUsersController);
router.put("/user/:userId/update-role", authToken, updateUserRoleController);

//product
router.post("/upload-product", authToken, uploadProductController);
router.get("/products", authToken, getAllProductsController);
router.put("/product/:id/update", authToken, updateProductController);
router.get("/products/categories", getAllProductCategoryController);
router.get("/products/category/:categoryName", getProductsByCategoryController);
router.get("/products/:id", getSingleProductDetailsController);

//cart
router.post("/product/add-to-cart", authToken, addToCartController);
router.get("/cart-products", authToken, getCartProductsByUserController);

module.exports = router;
