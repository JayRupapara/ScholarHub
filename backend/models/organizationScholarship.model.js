import mongoose from "mongoose";
const organizationScholarshipSchema = new mongoose.Schema({
    organizationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization',
        required: true,
    },
    scholarshipID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'scholarships',
        required: true,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
}, {
    timestamps: true,
});

export default mongoose.model("organizationscholarships", organizationScholarshipSchema);
