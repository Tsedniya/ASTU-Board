import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: String,

    role: {
      type: String,
      enum: ["student", "staff", "admin"],
      default: null,
    },

    department: {
      type: String,
      default: null,
    },

    year: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);