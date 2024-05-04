import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      trim: true,
    },
    product_name: {
      type: String,
      trim: true,
    },
    quantity: {
        type: Number,
        trim: true,
    },
    price: {
        type: Number,
       trim: true,
  },
  },
  { timestamps: true }
);

const Cust = mongoose.model("products", ProductSchema, "products");

export default Cust;