import mongoose from "mongoose";
const organizationScholarshipSchema = new mongoose.Schema({
    organizationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    scholarshipID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scholarship',
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

export default mongoose.model("OrganizationScholarship", organizationScholarshipSchema);
