import { User } from "../models/user.model";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "./error";


// Middleware to check if user is admin
export const adminOnly = TryCatch(async (req, res, next) => {

    const { id } = req.query

    if (!id) return next(new ErrorHandler("Please login first", 401))

    const user = await User.findById(id)

    if (!user) return next(new ErrorHandler("No user found", 401))

    if (user.role !== "admin") return next(new ErrorHandler("Only admin can access", 401))

    next()
})