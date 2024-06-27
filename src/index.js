//         http://localhost:5000/api/v1/auth/login-page


import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from "path";
import express from "express";
import cors from "cors";
import dbConnect from './utils/dbConnection.js';
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import indexRouter from "./routers/index.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });

dbConnect();

const whitelist = (process.env.WHITELIST || '').split(",");

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json({
    type: ["application/json", "text/plain"],
}));
app.use(helmet());
app.use(xss());
app.use(morgan("tiny"));

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "script-src 'self' 'unsafe-inline';"
    );
    next();
  });
  
app.use('/api/v1', indexRouter); // API routes
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server Running on " + `${port}`));
