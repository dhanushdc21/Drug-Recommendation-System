import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path:'../.env'});
console.log('Secret Key :', process.env.SECRET_KEY)
const secretKey = process.env.SECRET_KEY;


const generateJWTToken = (payload) => {
    if (!secretKey) {
        throw new Error('Secret key is not defined');
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
};

export { generateJWTToken };
