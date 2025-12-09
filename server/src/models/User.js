const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String }, // <-- not required anymore
    isAdmin: { type: Boolean, default: false },

    // OAuth-related fields (optional but very useful)
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
