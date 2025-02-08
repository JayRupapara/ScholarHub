// signup and login route
// Contoller logic here not in the route file
// This is the controller file
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// signup controller
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ msg: "User created" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
// login controller
exports.login = async (req, res) => {
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
      user: {
        id: user.id,
      },
    };
    // I HAVE ACESS TOKEN AND REFRESH TOKEN
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: "1y",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.json({ msg: "Login success" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
