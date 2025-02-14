import mongoose from "mongoose";

const userScholarshipSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scholarshipID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userScholarshipSchema.index({ userID: 1 });
userScholarshipSchema.index({ scholarshipID: 1 });

export default mongoose.model("userscholarship", userScholarshipSchema);
