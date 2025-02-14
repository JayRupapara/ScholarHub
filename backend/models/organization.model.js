import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    type: {
        type: String,
        enum: ["Non-Profit", "For-Profit", "Government"],
    },
    description: {
        type: String,
    },
    password: {
        type: String
    }
}, {
    timestamps: true,
});

export default mongoose.model("Organization", organizationSchema);
