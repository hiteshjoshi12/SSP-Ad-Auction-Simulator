const express = require("express");
const app = express();
const adRequestRoutes = require("./routes/adRequestRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/", adRequestRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
