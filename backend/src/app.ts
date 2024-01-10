import express from "express"
import { connectDb } from "./utils/connectDb"

const app = express()
app.use(express.json());



// Importing Routes
import userRoute from "./routes/user"
import { errorHandler } from "./middlewares/error";



connectDb();


app.get("/", (req, res) => {
    res.send("Welcome to the API!")
})


// Using Routes

app.use("/api/v1/user", userRoute)


app.use(errorHandler)

const port = 8080;

app.listen(port, () => {
    console.log(`Expsddresdass listening at http://localhost:${port}`)
})