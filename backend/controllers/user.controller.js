import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { uploadFileToS3 } from "../services/s3.js";

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password, Role, mobileNo } = req.body;
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
      Role,
      mobileNo,
    });
    await user.save();
    res.status(201).json({ msg: "User created" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req, res) => {
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

export const addDetails = async (req, res) => {
  const { mobileNo, highestQualification, gender, disability, caste, familyIncome, DOB } = req.body;
  const id = req.user.id;

  const response = await User.updateOne({ _id: id }, {
    mobileNo: mobileNo,
    highestQualification: highestQualification,
    gender: gender,
    disability: disability,
    caste: caste,
    familyIncome: familyIncome,
    DOB: DOB,
  });
  if (response.modifiedCount === 1) {
    return res.json({ msg: "Details added" });
  } else {
    return res.json({ msg: "Error Adding data" + err.message });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const type = req.params.type;

    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const fileType = req.file.mimetype;

    const user = await User.findById(req.user.id);
    await uploadFileToS3(fileBuffer, fileName, fileType);
    user.documents.push({
      documentId: "vbshdbv",
      documentType: type,
      documentURL: fileName,
    })

    user.save();
    return res.json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "File upload failed" });
  }
};
