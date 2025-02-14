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
          enum: ["Aadhar Card", "Pan Card", "12th Marksheet", "10th Marksheet"],
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
    bankDetails: {
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
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ fullName: "text" }); // For name-based search
userSchema.index({ gender: 1 });
userSchema.index({ caste: 1 });
userSchema.index({ familyIncome: 1 });

export default mongoose.model("User", userSchema);
