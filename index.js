const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connection is successful")
}).catch((err) => {
    console.log(err)
});
app.listen(process.env.PORT || 3000, () => {
    console.log("server is successfully running")
})