import mongoose from "mongoose"

const userScholarshipSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    scholarshipID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'scholarships',
        required: true,
    },
    status: {
        type: String,
    },
    docs: { type: [String] }
}, {
    timestamps: true
})

export default mongoose.model("userscholarship", userScholarshipSchema);