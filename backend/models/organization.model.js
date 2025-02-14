import mongoose from "mongoose";

export const organizationSchema = new mongoose.Schema(
  {
    scholarshipName: {
      type: String,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
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
    PaymentMethods: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
