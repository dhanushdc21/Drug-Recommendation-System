import { generateAPIError } from "../../errors/apiError.js";
import {errorWrapper}  from "../../middleware/errorWrapper.js";
import Admin from '../../models/User.js';
import { generateJWTToken } from "../../utils/jwtUtils.js";


const login = errorWrapper(async(req, res, next)=>{
    // logic
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
        console.log('Request Body:', req.body);
        console.log('Querying with:', { email: email, password: password });
const user = await Admin.findOne({ email: { $regex: new RegExp(email, 'i') } });
console.log('User from database:', user);

        if (user && email == user.email && password == user.password) {
            const jwtToken = generateJWTToken({ userId: email });

            return res.status(201).json({
                success: true,
                message: 'Admin login success.',
                data: {
                    email: user.email,
                    jwtToken: jwtToken
                }
            });
} else {
    console.log('Invalid email');
    return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
        data: null
    });
}
    }    
    catch (error) {
        console.error(error);
    return next(generateAPIError('some err', 400))
    }
})

export {
    login
}