import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SkillModel = mongoose.model("Skill", skillSchema);

export default SkillModel;
