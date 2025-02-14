import mongoose from "mongoose"

export const scholarshipSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    scholarshipID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scholarship',
        required: true,
    },
},{
    timestamps: true
})