import { TryCatch } from "../middlewares/error";
import { Coupon } from "../models/coupon.modal";
import ErrorHandler from "../utils/utility-class";



export const newCoupon = TryCatch(async (req, res, next) => {

    const { coupon, amount } = req.body

    if (!coupon || !amount) return next(new ErrorHandler("Please enter both coupon and amount", 400))

    await Coupon.create({ code: coupon, amount })

    return res.status(201).json({
        success: true,
        message: `Coupon ${coupon} Created Successfully`
    })

})