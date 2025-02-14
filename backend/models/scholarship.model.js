import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
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
        },
        highestQualification: {
          type: [String],
          enum: ["10th", "12th", "UG", "PG", "PHD"],
        },
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

scholarshipSchema.index({ scholarshipName: "text" }); // For name-based search
scholarshipSchema.index({ "eligibilityRequirements.maxIncome": 1 });
scholarshipSchema.index({
  "eligibilityRequirements.academic.minPercentage": 1,
});
scholarshipSchema.index({
  "eligibilityRequirements.academic.highestQualification": 1,
});
scholarshipSchema.index({ "eligibilityRequirements.category": 1 });
scholarshipSchema.index({ lastDate: 1 });
scholarshipSchema.index({ duration: 1 });
scholarshipSchema.index({ sahayType: 1 });

export default mongoose.model("scholarships", scholarshipSchema);
