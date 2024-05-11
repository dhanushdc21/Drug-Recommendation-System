import { generateAPIError } from "../../errors/apiError.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import Customer from '../../models/customer.js';
import { generateJWTToken } from "../../utils/jwtUtils.js";


const user = errorWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            console.log('Username and password are required');
            return res.status(400).json({
                success: false,
                message: 'Username and password are required',
                data: null
            });
        }

        const cust = await Customer.findOne({ email: email.trim() });
        console.log('User from database:', cust);
        if (cust) {
            if (email === cust.email && password === cust.password) {
                const jwtToken = generateJWTToken({ userId: email });
                return res.status(201).json({
                    success: true,
                    message: 'User login success.',
                    data: {
                        email: cust.email,
                        jwtToken: jwtToken
                    }
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email or password.',
                    data: null
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'No account available. Please sign-up.',
                data: null
            });
        }
    } catch (error) {
        console.error(error);
        return next(generateAPIError('some err', 400));
    }
});

export {
    user
};
