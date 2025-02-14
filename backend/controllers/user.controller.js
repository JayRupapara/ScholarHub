import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

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

const addDetails = async (req, res) => {
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

const applyForScholarship = async (req, res) => {
  const { scholarshipID } = req.body;
  const id= req.user.id;
  
};



export { login, signup, addDetails };