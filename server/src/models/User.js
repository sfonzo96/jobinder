import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: false,
            default: "Sin especificar",
        },
        position: {
            type: String,
            required: false,
            default: "Sin especificar",
        },
        companyName: {
            type: String,
            required: false,
            default: "Sin especificar",
        },
        isCurrentlyWorking: {
            type: Boolean,
            required: false,
            default: false,
        },
        bio: {
            type: String,
            required: false,
            default: "Sin especificar",
        },
        yearsOfExperience: {
            type: Number,
            required: false,
            default: "0",
        },
        seniority: {
            type: String,
            required: false,
            default: "Sin especificar",
        },
        skills: {
            type: [String],
            required: false,
        },
        avatar: {
            type: String,
            required: false,
            default: "",
        },
        lastActive: {
            type: Date,
            default: Date.now,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
