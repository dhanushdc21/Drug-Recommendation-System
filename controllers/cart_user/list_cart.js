import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateAPIError } from "../../errors/apiError.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import Cust from '../../models/customer.js';
import Cart from '../../models/cart.js';
import Product from '../../models/products.js'; // Import the Product model
dotenv.config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY;

const list_cart = errorWrapper(async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const jwttoken = authHeader && authHeader.split(' ')[1];
        // Check if the JWT token is missing
        if (!jwttoken) {
            return res.status(401).json({
                success: false,
                message: 'JWT token is missing.',
                data: null
            });
        }

        // Verify the JWT token
        jwt.verify(jwttoken, secretKey, async (err, decoded) => {
            if (err) {
                // Handle invalid JWT token
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.',
                    data: null
                });
            }

            // Find the user based on the decoded userId
            const user = await Cust.findOne({ email: decoded.userId });
            if (!user) {
                // Handle user not found
                return res.status(401).json({
                    success: false,
                    message: 'You are not a customer.',
                    data: null
                });
            }

            // Retrieve the cart list for the authenticated user and populate the items field
            const cartList = await Cart.find({ userId: user._id });
            
            // Send the formatted cart list as response
            res.json(cartList);
        });
    } catch (error) {
        console.error(error);
        return next(generateAPIError('Some error occurred', 400));
    }
});

export {
    list_cart
};
