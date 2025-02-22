require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoute");
const busRoutes = require("./routes/BusRoute");
const adminRoutes = require("./routes/adminRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/admin", adminRoutes);
// Connect DB and Start Server
connectDB();
app.listen(5000, () => console.log("Server running on port 5000"));
