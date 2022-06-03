
const express = require("express");


const app = express();

// database user password = Xw5KQfF7p6P9a6PU
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");


app.use(express.json());


dotenv.config();
//connect with data base

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("db connection successfull"))
.catch((err) => console.log(err));


app.use("/api/users",userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("server is runnning");
})