import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateAPIError } from "../../errors/apiError.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { generateJWTToken } from "../../utils/jwtUtils.js";
import Customer from '../../models/customer.js';
import Admin from '../../models/User.js'; // Assuming the correct path
dotenv.config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY;

const change_pssword = errorWrapper(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let { new_password, confirm_password } = req.body; // Use let instead of const for potential mutation
    console.log(token);
    console.log(new_password);
    console.log(confirm_password);
    try {
        if (!new_password || !confirm_password ) {
            return res.status(400).json({
                success: false,
                message: 'Type in the password',
                data: null
            });
        }
        if (new_password!=confirm_password){
            return res.status(400).json({
                success: false,
                message: 'Type in the same password',
                data: null
            });
        }
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
        const cust = await Customer.findOne({ email: decoded.userId });
        const adm = await Admin.findOne({ email: decoded.userId }); // Corrected model name
        if (cust || adm) {
            if (cust) {
                cust.password = new_password;
                await cust.save();
            } else {
                adm.password = new_password;
                await adm.save();
            }
            return res.status(201).json({
                success: true,
                message: 'Password updated successfully',
                data: null
            });
        } else {
            return res.status(404).json({ // If no user found
                success: false,
                message: 'User not found',
                data: null
            });
        } });
    } catch (error) {
        console.error('Error during forgot_data:', error.message);
        return res.status(500).json({ // Internal server error
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
});

export {
    change_pssword
};
