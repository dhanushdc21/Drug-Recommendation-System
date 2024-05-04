import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateAPIError } from "../../errors/apiError.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import Product from '../../models/products.js'; 
dotenv.config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY;

const search_product = errorWrapper(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let {product_name} = req.body;
    try {
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
            console.log("verified")

        // Retrieve all products from the database
        const product = await Product.findOne({product_name: product_name.trim()});

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.',
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product details.',
            data: product // Return the product details
        });
    });
    } catch (error) {
        console.error(error);
        return next(generateAPIError('Some error occurred', 400));
    }
});

export {
    search_product
};
