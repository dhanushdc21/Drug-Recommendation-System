import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Product from '../../models/products.js';
import { generateAPIError } from "../../errors/apiError.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import Admin from '../../models/User.js'; 
dotenv.config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY;

const delete_product = errorWrapper(async (req, res, next) => {
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
                    message: 'You are not authorized to delete products.',
                    data: null
                });
            }

            // Extract product_id from the request parameters
            const { product_id } = req.body;
            
            console.log(product_id);
            let product = await Product.findOneAndDelete({ _id: product_id });
            console.log(product);
            if (product) {
                console.log("Product deleted successfully.");
                return res.status(200).json({
                    success: true,
                    message: 'Product deleted successfully.',
                    data: {}
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found.',
                    data: null
                });
            }
        });
    } catch (error) {
        console.error(error);
        return next(generateAPIError('Some error occurred', 400));
    }
});

export {
    delete_product
};
