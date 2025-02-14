import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  documents: [{
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
    }
  }],
  Role: {
    type: String,
    enum: ["User", "Organization"]
  },
  highestQualification: {
    type: String,
    enum: ["10th", "12th", "UG", "PG", "PHD"]
  },
  gender:{
    type: [String],
    enum: ["Male","Female"]
  },
  disability: {
    type: Boolean,
    default: false,
  },
  caste: {
    type: [String],
    enum: ['General', 'ST', 'SC', 'OBC']
  },
  familyIncome: {
    type: Number,
  },
  DOB: {
    type: Date
  },
  bankDetails: [{
    accountNumber: {
      type: Number,
    },
    IFSC: {
      type: String,
    },
    bankName: {
      type: String,
    },
    branchName: {
      type: String,
    },
  }],
}, {
  timestamps: true,
});

export default mongoose.model("User", userSchema);
