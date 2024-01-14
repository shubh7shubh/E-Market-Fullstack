import express from "express"
import { connectDb } from "./utils/connectDb"
import { errorHandler } from "./middlewares/error";
import NodeCache from "node-cache"
const dotenv = require("dotenv").config();
import morgan from "morgan"
import Stripe from "stripe";
import cors from "cors"

const app = express()
app.use(express.json());
app.use(morgan("dev"))
app.use(cors());


const port = process.env.PORT || 4000;
const stripeKey = process.env.STRIPE_KEY || ""


export const stripe = new Stripe(stripeKey)
export const myCache = new NodeCache();


// Importing Routes
import userRoute from "./routes/user"
import productRoute from "./routes/product"
import orderRoute from "./routes/order"
import paymentRoute from "./routes/payment"
import dashboardRoute from "./routes/stats"


connectDb();


app.get("/", (req, res) => {
    res.send("Welcome to the API!")
})


// Using Routes

app.use("/api/v1/user", userRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/payment", paymentRoute)
app.use("/api/v1/dashboard", dashboardRoute)


app.use("/uploads", express.static("uploads"));
app.use(errorHandler)



app.listen(port, () => {
    console.log(`Expsddresdass listening at http://localhost:${port}`)
})