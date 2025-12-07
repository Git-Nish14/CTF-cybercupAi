// src/models/Attempt.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttemptSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    problemId: { type: Schema.Types.ObjectId, ref: "Problem", required: true },

    // your "answers array"
    answers: [{ type: String, required: true }],

    result: {
      type: String,
      enum: ["correct", "incorrect"],
      required: true,
    },
  },
  { timestamps: true }
);

AttemptSchema.index({ userId: 1, problemId: 1, createdAt: 1 });

AttemptSchema.index(
  { userId: 1, problemId: 1, result: 1 },
  {
    unique: true,
    partialFilterExpression: { result: "correct" },
  }
);

module.exports = mongoose.model("Attempt", AttemptSchema);
