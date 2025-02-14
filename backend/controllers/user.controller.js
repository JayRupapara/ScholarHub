import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import multer from "multer";
import { uploadFileToS3 } from "../services/s3.js";

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password, Role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ msg: "User created" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = {
      id: user.id,
    };
    // Generate access and refresh tokens
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN);

    res.cookie("accessToken", accessToken, { httpOnly: true });

    res.json({ msg: "Login success" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const upload = multer();
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}-${req.file.originalname}`; // Unique file name
    const fileType = req.file.mimetype;

    // Upload to S3
    const fileUrl = await uploadFileToS3(fileBuffer, fileName, fileType);

    res.json({
      message: "File uploaded successfully",
      fileUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};
