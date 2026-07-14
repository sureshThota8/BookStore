const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.get("/",(req,res)=>{
    res.send("Book Store API Running");
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
});
const bookRoutes=require("./routes/bookRoutes");

app.use("/api/books",bookRoutes);
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth",authRoutes);
const cartRoutes=require("./routes/cartRoutes");

app.use("/api/cart",cartRoutes);
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders",orderRoutes);
const path = require("path");

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);
