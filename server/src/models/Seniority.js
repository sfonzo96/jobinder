import mongoose from "mongoose";

const senioritySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const SeniorityModel = mongoose.model("Seniority", senioritySchema);

export default SeniorityModel;
