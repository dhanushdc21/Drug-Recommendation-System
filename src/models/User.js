import mongoose from "mongoose";
import validator from "validator";

// sample use-case
const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("User", AdminSchema, "User");

export default Admin;