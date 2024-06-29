import { generateAPIError } from "../../errors/apiError.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import Customer from '../../models/customer.js';
import { generateJWTToken } from "../../utils/jwtUtils.js";


const new_user = errorWrapper(async (req, res, next) => {
    const { email, password, confirm_password } = req.body;
    console.log(req.body)
    try{
        if (!email || !password || !confirm_password) {
            console.log("fine1")
            return res.status(400).json({
                success: false,
                message: 'Username and password are required',

                data: null
            });
            
        }
        if (password!=confirm_password) {
            console.log("fine2")
            return res.status(400).json({
                success: false,
                message: 'Re-enter the password.',
                data: null
            });
        }

        const newCustomer = new Customer({
        email: email.trim(),
        password: password.trim()
    });
    console.log("fine3")
    await newCustomer.save();
    console.log('User signup complete.');
    const jwtToken = generateJWTToken({ userId: email });
    return res.status(201).json({
        success: true,
        message: 'User signup complete',
        data:{
            email: email,
            jwtToken: jwtToken
        }
    });
    }catch(error){
        console.error('Error during signup1:', error.message);
        return res.status(400).json({
            success: false,
            message: error.message,
            data: null
        });
        console.error(error.stack); // Log the stack trace    
        return next(generateAPIError('some err', 400));
    }
});

export {
    new_user
};
