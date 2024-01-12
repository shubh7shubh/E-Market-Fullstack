import { myCache } from "../app";
import { Order } from "../models/order.modal";
import { Product } from "../models/product.modal";
import { InvalidateCacheProps, OrderItemType } from "../types/types";


export const invalidateCache = async ({ product,
    admin,
    order,
    userId,
    orderId,
    productId }: InvalidateCacheProps) => {

    if (product) {
        const productKeys: string[] = ["latest-products",
            "categories",
            "all-products",
        ]

        if (typeof productId === "string") productKeys.push(`product-${productId}`)

        if (typeof productId === "object") {
            productId.forEach((i) => productKeys.push(`product-${i}`));
        }

        myCache.del(productKeys)

    }
    if (order) {

        const orderKeys: string[] = ["all-orders", `my-orders-${userId}`, `order-${orderId}`]

        myCache.del(orderKeys)

    }
    if (admin) {

    }

}


export const reduceStock = async (orderItems: OrderItemType[]) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product) throw new Error("Product Not Found");
        product.stock -= order.quantity;
        await product.save();
    }
};
