const express = require("express");
require('dotenv').config();
const app = express();
const adRequestRoutes = require("./routes/adRequestRoutes");
const adminRoutes = require('./routes/admin');

const cors = require("cors");
const connectDB = require('./database/config');


app.use(cors());
app.use(express.json());
app.use('/admin', adminRoutes);
app.use("/", adRequestRoutes);

const PORT = process.env.PORT||5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
