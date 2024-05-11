import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');

try {
    dotenv.config({ path: envPath });
    console.log('Environment variables loaded successfully');
    console.log('Secret Key:', process.env.SECRET_KEY);
} catch (err) {
    console.error('Error loading .env file:', err.message);
}

const secretKey = process.env.SECRET_KEY;

const generateJWTToken = (payload) => {
    console.log('Secret Key in generateJWTToken:', secretKey); // Add this line
    if (!secretKey) {
        console.error('Secret key is not defined'); // Add this line
        throw new Error('Secret key is not defined');
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
};

export { generateJWTToken };
