require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
app.use(express.json());

const connectDB = require("./connection/connection");
connectDB();
// connectDB();
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
