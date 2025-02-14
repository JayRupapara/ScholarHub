import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import userRoutes from "./routes/user.js";
app.use(express.json());

import { connectDB } from "./connection/connection.js";

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
