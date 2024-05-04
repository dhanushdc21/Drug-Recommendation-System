import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Product from '../../models/products.js';
import { generateAPIError } from "../../errors/apiError.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import Admin from '../../models/User.js';
dotenv.config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY;

const add_product = errorWrapper(async (req, res, next) => {
    try {
        // Extract JWT token from the Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'JWT token is missing.',
                data: null
            });
        }

        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.',
                    data: null
                });
            }

            // Check if the user is an admin
            const user = await Admin.findOne({ email: decoded.userId });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'You are not authorized to add products.',
                    data: null
                });
            }

            // Proceed with adding product
            let product = await Product.findOne({ product_name: req.body.product_name.trim() });
            if (product) {
                // If product exists, increment the quantity
                product.quantity += req.body.quantity;
                await product.save();
                console.log("Product quantity incremented successfully.");
                return res.status(200).json({
                    success: true,
                    message: 'Product quantity incremented successfully.',
                    data: { product_name: product.product_name, quantity: product.quantity, price: product.price }
                });
            } else {
                // If product does not exist, create a new product
                const newProduct = new Product({
                    product_name: req.body.product_name.trim(),
                    image: req.body.image, // Assigning the image URL
                    quantity: req.body.quantity,
                    price: req.body.price
                });
                await newProduct.save();
                console.log("New product added successfully.");
                return res.status(201).json({
                    success: true,
                    message: 'New product added successfully.',
                    data: { product_name: newProduct.product_name, quantity: newProduct.quantity, price: newProduct.price }
                });
            }
        });
    } catch (error) {
        console.error(error);
        return next(generateAPIError('Some error occurred', 400));
    }
});

export {
    add_product
};
