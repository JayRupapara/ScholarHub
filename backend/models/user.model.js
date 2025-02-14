import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    documents: [
      {
        documentType: {
          type: String,
        },
        documentId: {
          type: String,
        },
        documentURL: {
          type: String,
        },
        verificationStatus: {
          type: Boolean,
          default: false,
        },
      },
    ],
    highestQualification: {
      type: String,
      enum: ["10th", "12th", "UG", "PG", "PHD"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    disability: {
      type: Boolean,
      default: false,
    },
    caste: {
      type: String,
      enum: ["General", "ST", "SC", "OBC"],
    },
    familyIncome: {
      type: Number,
    },
    DOB: {
      type: Date,
    },
    savedScholarships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scholarships",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
