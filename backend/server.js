import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
app.use(express.json());
import cors from "cors";
app.use(cors());
import { connectDB } from "./connection/connection.js";

connectDB();

app.use(cookieParser());

app.use("/api/v1", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
