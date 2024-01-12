import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { newCoupon } from "../controllers/payment.js";
// import {
//   allCoupons,
//   applyDiscount,
//   createPaymentIntent,
//   deleteCoupon,
//   newCoupon,
// } from "../controllers/payment.js";

const router = express.Router();

// route - /api/v1/payment/create
// router.post("/create", createPaymentIntent);

// // route - /api/v1/payment/coupon/new
// app.get("/discount", applyDiscount);

// route - /api/v1/payment/coupon/new
router.post("/coupon/new", newCoupon);

// // route - /api/v1/payment/coupon/all
// app.get("/coupon/all", adminOnly, allCoupons);

// // route - /api/v1/payment/coupon/:id
// app.delete("/coupon/:id", adminOnly, deleteCoupon);

export default router;