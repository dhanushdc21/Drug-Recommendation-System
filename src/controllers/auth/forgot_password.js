import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { errorWrapper } from "../../middleware/errorWrapper.js";
import Customer from '../../models/customer.js';
dotenv.config({ path: '../.env' });

const mail = process.env.MAIL;
const password = process.env.PASSWORD;

const sendOTP = async (email, otp) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: mail, // Your Gmail address
                pass: password // Your Gmail password
            }
        });

        // Send email with OTP
        let info = await transporter.sendMail({
            from: mail,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        });

        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

const forgot_data = errorWrapper(async (req, res, next) => {
    let { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'email is required',
                data: null
            });
        }

        const cust = await Customer.findOne({ email: email.trim() });
        if (cust) {
            const otp = crypto.randomBytes(3).toString('hex');

            // Save OTP to the database
            cust.otp = otp;
            await cust.save();

            // Send OTP to the user's email
            await sendOTP(cust.email, otp);

            return res.status(200).json({
                success: true,
                message: 'OTP sent to your email',
                data: cust.email
            });
        } else {
            return res.status(404).json({ // If no user found
                success: false,
                message: 'User not found',
                data: null
            });
        }
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
    forgot_data
};
