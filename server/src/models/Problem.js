const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProblemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    flagAnswer: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // admin user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", ProblemSchema);
