import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { createProduct, deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
// import {
//   deleteProduct,
//   getAdminProducts,
//   getAllCategories,
//   getAllProducts,
//   getSingleProduct,
//   getlatestProducts,
//   newProduct,
//   updateProduct,
// } from "../controllers/product.js";
// import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

//To Create New Product  - /api/v1/product/new
router.post("/new", adminOnly, singleUpload, createProduct);

// //To get all Products with search and filters  - /api/v1/product/all
router.get("/all", getAllProducts);

//To get last 10 Products  - /api/v1/product/latest
router.get("/latest", getLatestProducts);

//To get all unique Categories  - /api/v1/product/categories
router.get("/categories", getAllCategories);

//To get all Products   - /api/v1/product/admin-products
router.get("/admin-products", adminOnly, getAdminProducts);

// // To get, update, delete Product
router
    .route("/:id")
    .get(getSingleProduct)
    .put(adminOnly, singleUpload, updateProduct)
    .delete(adminOnly, deleteProduct);

export default router;