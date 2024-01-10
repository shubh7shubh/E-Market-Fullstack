import { NextFunction, Request, Response } from "express"
import { User } from "../models/user.model";
import { NewUserRequestBody } from "../types/types";
import { TryCatch } from "../middlewares/error";
import ErrorHandler from "../utils/utility-class";


export const newUser = TryCatch(async (req: Request<{}, {}, NewUserRequestBody>, res: Response, next: NextFunction) => {

    const { _id, dob, email, gender, name, photo } = req.body;

    let user = await User.findById(_id)

    if (user) return res.status(200).json({
        success: true,
        message: `Welcome ${user.name}`
    })


    if (!_id || !name || !email || !photo || !gender || !dob)
        return next(new ErrorHandler('Please provide all values', 400));



    user = await User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob),
    });

    return res.status(201).json({
        success: true,
        message: `Welcome ${user.name}`
    })
})


export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({})
    res.status(200).json({
        sucess: true,
        users
    })
})