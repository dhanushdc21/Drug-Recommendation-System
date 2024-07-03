//http://localhost:5000/api/v1/auth/login-page
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import cors from 'cors';
import dbConnect from './utils/dbConnection.js';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import indexRouter from './routers/index.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });

dbConnect();

app.set('trust proxy', 1);

app.use(cors());

app.use(express.json({ type: ['application/json', 'text/plain'] }));

// Set Content Security Policy for node_modules
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// Set a global Content Security Policy
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net"
    );
    next();
});

app.use(xss());

app.use(morgan('tiny'));

// Serve static files (e.g., frontend files)
app.use(express.static(path.join(__dirname, 'frontend')));

// API routes
app.use('/api/v1', indexRouter);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
