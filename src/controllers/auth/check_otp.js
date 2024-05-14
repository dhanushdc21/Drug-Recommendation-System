import { generateAPIError } from "../../errors/apiError.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { generateJWTToken } from "../../utils/jwtUtils.js";
import Customer from '../../models/customer.js'; 


const verify = errorWrapper(async (req, res, next) => {
    try {
        let {email, otp} = req.body;
        console.log(otp);
        const cust = await Customer.findOne({ email: email.trim() });
        if (cust){
            if (cust.otp==otp){
                const jwtToken = generateJWTToken({ userId: email });
                return res.status(200).json({
                    success: true,
                    message: 'OTP verified',
                    data: {
                        email: cust.email,
                        jwtToken: jwtToken
                    }
                });
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: 'OTP not verified',
                    data: null
                });
            }
        }

    } catch (error) {
        console.error(error);
        return next(generateAPIError('Some error occurred', 400));
    }
});

export {
    verify
};
