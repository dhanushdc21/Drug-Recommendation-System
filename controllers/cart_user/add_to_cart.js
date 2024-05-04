import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Product from '../../models/products.js';
import { generateAPIError } from "../../errors/apiError.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import Cust from '../../models/customer.js';
import Cart from '../../models/cart.js';
dotenv.config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY;

const add_to_cart = errorWrapper(async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const jwttoken = authHeader && authHeader.split(' ')[1];
        const {image, product_name, quantity, price } = req.body;
        console.log("Quantity value:", quantity);

        // Check if JWT token is provided
        if (!jwttoken) {
            return res.status(401).json({
                success: false,
                message: 'JWT token is missing.',
                data: null
            });
        }

        // Verify JWT token
        jwt.verify(jwttoken, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.',
                    data: null
                });
            }

            // Find the user by email
            const user = await Cust.findOne({ email: decoded.userId });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'You are not a customer.',
                    data: null
                });
            } else {
                // Find the product by name
                const product = await Product.findOne({ product_name: product_name.trim() });
                if (!product) {
                    return res.status(404).json({
                        success: false,
                        message: 'Product not found.',
                        data: null
                    });
                }

                // Check if the product is already in the user's cart
                let userCart = await Cart.findOne({ userId: user._id });
                if (!userCart) {
                    // If the user does not have a cart, create a new one
                    userCart = new Cart({
                        userId: user._id,
                        items: [{ productId: product._id, quantity, image, product_name, price }]
                    });
                } else {
                    // If the user has a cart, check if the product is already in the cart
                    const existingItemIndex = userCart.items.findIndex(item => item.productId.toString() === product._id.toString());
                    if (existingItemIndex !== -1) {
                        // If the product is already in the cart, update the quantity
                        userCart.items[existingItemIndex].quantity += quantity;
                    } else {
                        // If the product is not in the cart, add a new cart item
                        userCart.items.push({
                             productId: product._id, 
                             quantity, 
                             image, 
                             product_name, 
                             price 
                            });
                    }
                }

                // Save the cart
                await userCart.save();

                console.log("Item added to cart successfully.");
                return res.status(201).json({
                    success: true,
                    message: 'Item added to cart successfully.',
                    data: userCart
                });
            }
        });
    } catch (error) {
        console.error(error);
        return next(generateAPIError('Some error occurred', 400));
    }
});

export {
    add_to_cart
};
