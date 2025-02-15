import User from "../models/user.model.js";
import Scholarship from "../models/scholarship.model.js";
import UserScholarship from "../models/userScholarship.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { uploadFileToS3 } from "../services/s3.js";
import AWS from "aws-sdk";

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

    const type = req.param.type;

    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const fileType = req.file.mimetype;

    const user = await User.findById(req.user.id);
    await uploadFileToS3(fileBuffer, fileName, fileType);

    // Check if the document type already exists
    const documentExists = user.documents.some(doc => doc.documentType === type);
    if (!documentExists) {
      user.documents.push({
        documentId: "vbshdbv",
        documentType: type,
        documentURL: fileName,
      });
      await user.save();
    } else {
      const updatedDocuments = user.documents.map(doc =>
        doc.documentType === type ? { ...doc, documentURL: fileName } : doc
      );
      user.documents = updatedDocuments;
      await user.save();
      return res.json({ message: "Document type updated successfully" });
    }
    return res.json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "File upload failed " + error });
  }
};

export const getProfileDetails = async (req, res) => {
  const id = req.user.id;

  try {
    const userDetails = await User.findById(id).select('-password -__v -createdAt -updatedAt');
    if (!userDetails) {
      return res.json({ error: "User not found" }).status(404);
    }

    return res.json(userDetails).status(200);
  } catch (error) {
    return res.json({ error: "Internal server error: " + error.message }).status(500);
  }
}

export const getScholarships = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page number from query, default to 1
  const limit = 6; // Get the limit from query, default to 6
  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const scholarships = await Scholarship.find().skip(skip).limit(limit);
  const totalScholarships = await Scholarship.countDocuments(); // Get total number of scholarships

  if (!scholarships || scholarships.length === 0) {
    return res.status(404).json({ message: 'No scholarships found' });
  }

  return res.status(200).json({
    scholarships,
    total: totalScholarships,
    page,
    totalPages: Math.ceil(totalScholarships / limit), // Calculate total pages
  });
}

export const addScholarshipToUser = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the request
  const { scholarshipId } = req.body; // Get the scholarship ID from the request body

  try {
    // Find the user and update their scholarships array
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedScholarships: scholarshipId } }, // Use $addToSet to avoid duplicates
      { new: true, select: '-password -__v -createdAt -updatedAt' } // Return the updated user without sensitive info
    );

    if (!user) {
      return res.json({ error: "User not found" }).status(404);
    }

    return res.status(200).json({ message: "Scholarship added successfully" });
  } catch (error) {
    console.error("Error adding scholarship:", error);
    return res.status(500).json({ error: "Internal server error: " + error.message });
  }
}

export const getSavedScholarships = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the request

  try {
    // Find the user and populate their savedScholarships
    const user = await User.findById(userId).populate('savedScholarships');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ savedScholarships: user.savedScholarships });
  } catch (error) {
    console.error("Error fetching saved scholarships:", error);
    return res.status(500).json({ error: "Internal server error: " + error.message });
  }
}

export const applyScholarship = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the request
  const { scholarshipId, documents } = req.body; // Get the scholarship ID from the request body
  console.log(userId, req.body);

  try {
    // Find the scholarship and user
    const scholarship = await Scholarship.findById(scholarshipId);
    const user = await User.findById(userId);

    if (!scholarship) {
      return res.status(404).json({ error: "Scholarship not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check eligibility (assuming eligibilityRequirements is an object in the scholarship)
    console.log(user.income,scholarship.eligibilityRequirements.maxIncome)
    const isEligible = user.familyIncome <= scholarship.eligibilityRequirements.maxIncome
    console.log(isEligible)
    if (isEligible) {
      const data  = new UserScholarship({
        userID: userId,
        scholarshipID: scholarshipId,
        documents: documents,
      }) 
      await data.save()
      return res.status(200).json({ message: "Scholarship application submitted successfully" ,success:true});
    }else{
      return res.json({ message: "Not eligible" ,success:false}).status(200)
    }
  } catch (error) {
    console.error("Error applying for scholarship:", error);
    return res.status(500).json({ error: "Internal server error: " + error.message });
  }
}