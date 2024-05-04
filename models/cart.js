import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      trim:true
    },
    image: {
      type: String,
      trim: true,
    },
    product_name: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    }
  });
  
  // Define the Cart schema
  const CartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    },
    items: [CartItemSchema]
  });

  const Cart = mongoose.model("Cart", CartSchema, "Cart");

export default Cart;