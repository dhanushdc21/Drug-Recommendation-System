import mongoose from "mongoose";
import validator from "validator";

const CustomerSchema = new mongoose.Schema(
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
    otp: {
      type: String
    }
  },
  { timestamps: true }
);

const Cust = mongoose.model("customer", CustomerSchema, "customer");

export default Cust;