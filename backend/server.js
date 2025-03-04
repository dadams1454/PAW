const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
    res.send("🐶 Dog Breeder API is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
const dogRoutes = require("./routes/dogRoutes");
app.use("/api/dogs", dogRoutes);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  next();
});
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
