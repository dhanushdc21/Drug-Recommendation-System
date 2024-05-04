import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateAPIError } from "../../errors/apiError.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import Product from '../../models/products.js'; 
dotenv.config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY;

const view_products = errorWrapper(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const { product_name } = req.body; // Extract product_name from query parameters

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

            let productList;

            // Check if a product name is provided in the query parameters
            if (product_name) {
                productList = await Product.find({ product_name: { $regex: new RegExp(product_name, 'i') } });
            } else {
                productList = await Product.find({});
            }

            return res.status(200).json({
                success: true,
                message: 'Product list.',
                data: productList
            });
        });
    } catch (error) {
        console.error(error);
        return next(generateAPIError('Some error occurred', 400));
    }
});

export {
    view_products
};
