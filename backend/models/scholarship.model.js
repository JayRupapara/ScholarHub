import mongoose from "mongoose";

export const scholarshipSchema = new mongoose.Schema(
  {
    scholarshipName: {
      type: String,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    eligibilityRequirements: {
      maxIncome: {
        type: Number,
        required: false,
      },
      disability: {
        type: Boolean,
      },
      academic: {
        minPercentage: {
          type: Number,
          min: 0,
          max: 100,
        },//hq
        highestQualification:{
          type: [String],
          enum: ["10th", "12th", "UG", "PG", "PHD"]
        }
      },
      category: {
        type: [String],
        enum: ["General", "OBC", "SC", "ST", "EWS", "Other"],
        required: false,
      },
      otherRequirements: {
        type: String,
        required: false,
      },
    },

    lastDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      enum: ["OneTime", "Renewable"],
    },
    sahayType: {
      type: String,
      enum: ["Lump-Sum", "Installments"],
    },
  },
  {
    timestamps: true,
  }
);
