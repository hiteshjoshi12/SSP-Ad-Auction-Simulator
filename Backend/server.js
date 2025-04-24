const express = require("express");
const app = express();
const adRequestRoutes = require("./routes/adRequestRoutes");
const adminRoutes = require("./routes/admin");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/ssp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

app.use(cors());
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/", adRequestRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
