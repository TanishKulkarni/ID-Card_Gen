require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const adminRoutes = require("./Routes/adminRoutes");
const studentRoutes = require("./Routes/studentRoutes");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
