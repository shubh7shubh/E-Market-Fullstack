import { Request } from "express";
import { TryCatch } from "../middlewares/error";
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from "../types/types";
import { Product } from "../models/product.modal";
import ErrorHandler from "../utils/utility-class";
import { rm } from "fs";
import { faker } from "@faker-js/faker"
import { myCache } from "../app";
import { invalidateCache } from "../utils/features";



// we can use as string or ! in line no 18
// The cache should be revalidate on update, delete and create product and on New Order
export const getLatestProducts = TryCatch(async (req, res, next) => {
    let products;

    if (myCache.has("latest-products")) {
        products = JSON.parse(myCache.get("latest-products") as string)
    } else {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(10);
        myCache.set("latest-products", JSON.stringify(products))
    }
    return res.status(200).json({
        success: true,
        products
    })
})

// The cache should be revalidate on update, delete and create product and on New Order
export const getAllCategories = TryCatch(async (req, res, next) => {

    let categories;
    if (myCache.has("categories"))
        categories = JSON.parse(myCache.get("categories") as string)
    else {
        categories = await Product.distinct("category")
        myCache.set("categories", JSON.stringify(categories))
    }

    return res.status(200).json({
        success: true,
        categories
    })
})

// The cache should be revalidate on update, delete and create product and on New Order
export const getAdminProducts = TryCatch(async (req, res, next) => {
    let adminProducts
    if (myCache.has("all-products"))
        adminProducts = JSON.parse(myCache.get("all-products") as string)
    else {
        adminProducts = await Product.find({})
        myCache.set("all-products", JSON.stringify(adminProducts))
    }

    return res.status(200).json({
        success: true,
        adminProducts
    })
})
// imp - the single product can be change The cache should be revalidate on update, delete and create product and on New Order

export const getSingleProduct = TryCatch(async (req, res, next) => {
    const id = req.params.id
    let singleProduct

    if (myCache.has(`product-${id}`))
        singleProduct = JSON.parse(myCache.get(`product-${id}`) as string)
    else {
        singleProduct = await Product.findById(id)
        if (!singleProduct) return next(new ErrorHandler("Product not found", 404))
        myCache.set(`product-${id}`, JSON.stringify(singleProduct))
    }

    return res.status(200).json({
        success: true,
        singleProduct
    })
})



export const createProduct = TryCatch(async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, category, price, stock } = req.body;
    const photo = req.file

    if (!photo) return next(new ErrorHandler("Please add a photo", 400))

    if (!name || !category || !price || !stock) {
        rm(photo.path, () => {
            console.log("Deleted the photo")
        })
        return next(new ErrorHandler("Please enter all fields", 400))
    }

    await Product.create({
        name, category: category.toLowerCase(), price, stock, photo: photo.path
    })

    invalidateCache({ product: true, admin: true, })

    return res.status(201).json({
        success: true,
        message: "Product created successfully"
    })


})


export const updateProduct = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const { name, category, price, stock } = req.body;
    const photo = req.file

    const product = await Product.findById(id)

    if (!product) return next(new ErrorHandler("Product not found", 404))


    if (photo) {
        rm(product.photo!, () => {
            console.log("Old photo deleted")
        });
        product.photo = photo.path
    }

    if (name) product.name = name
    if (price) product.price = price
    if (category) product.category = category
    if (stock) product.stock = stock

    await product.save();

    invalidateCache({ product: true, productId: String(product._id), admin: true })


    return res.status(201).json({
        success: true,
        message: "Product update Successfully"
    })
})

export const deleteProduct = TryCatch(async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) return next(new ErrorHandler("Product not found", 404))
    rm(product.photo!, () => {
        console.log("photo deleted")
    });

    await product.deleteOne()

    invalidateCache({ product: true, productId: String(product._id), admin: true })


    return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})

export const getAllProducts = TryCatch(async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {

    const { category, price, search, sort } = req.query;

    const page = Number(req.query.page) || 1
    // 1,2,3,4,5,6,7,8
    // 9,10,11,12,13,14,15,16
    // 17,18,19,20,21,22,23,24
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {}

    if (search) {
        baseQuery.name = {
            $regex: search,
            $options: "i",
        }
    }

    if (price) {
        baseQuery.price = {
            $lte: Number(price)
        }
    }

    if (category) baseQuery.category = category;

    const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);

    const [products, filteredOnlyProduct] = await Promise.all([
        productsPromise,
        Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProduct.length / limit)


    return res.status(200).json({
        success: true,
        products,
        totalPage,
    });

});



// const generateRandomProducts = async (count: number = 20) => {
//     const products = [];

//     for (let i = 0; i < count; i++) {
//         const product = {
//             name: faker.commerce.productName(),
//             photo: "uploads\\1704992485278-macbook-459196_1280 (1).jpg",
//             price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//             stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//             category: faker.commerce.department(),
//             createdAt: new Date(faker.date.past()),
//             updatedAt: new Date(faker.date.recent()),
//             __v: 0,
//         };

//         products.push(product);
//     }

//     await Product.create(products);

//     console.log({ succecss: true });
// };

// const deleteRandomsProducts = async (count: number = 10) => {
//     const products = await Product.find({}).skip(2);

//     for (let i = 0; i < products.length; i++) {
//         const product = products[i];
//         await product.deleteOne();
//     }

//     console.log({ succecss: true });
// };

// generateRandomProducts(40)