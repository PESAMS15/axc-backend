const express = require("express");
require("dotenv").config()
const app = express();
const mongoose = require("mongoose")
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({ extended: true, limit:"100mb" }));
app.use(cors({origin:"*"})) 
app.use("/users", userRouter)





const uri = process.env.MONGODB_URI
const connect = () => {
    mongoose.set("strictQuery", false)
    mongoose.connect(uri).then(() => {
        console.log("Connected to mongoDB")
    }).catch((error) => {
        console.log(error)
    })
}
connect()


let server = app.listen("6050", () => {
    console.log("Server started in port 6050")
})