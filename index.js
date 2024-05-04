import dotenv from 'dotenv';
import path from "path";
import express from "express";
import cors from "cors";
import { URL } from 'url'; // Import URL constructor
import dbConnect from './utils/dbConnection.js'; // import db connection feature from util folder
import morgan from "morgan";
// const rateLimiter = require("express-rate-limit");
import helmet from "helmet";
import xss from "xss-clean";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js"
import indexRouter from "./routers/index.js"

const app = express();
try{
	const root_dir = new URL("..", import.meta.url).pathname;
	console.log('Constructed .env path:', root_dir);
	dotenv.config({ path:'../.env'});
}
catch(err){
	console.error('Error loading .env file:', error.message);
}

console.log('DB_URL:', process.env.DB_URL);
console.log('Actual Connection String:', process.env.DB_URL);

dbConnect();     // To connect to the database.

const whitelist = (process.env.WHITELIST || '').split(",");

app.set("trust proxy", 1); // trust first proxy

// const corsOptions = {
// 	// eslint-disable-next-line consistent-return
// 	origin(origin, callback) {
// 		if (!origin) { // for mobile app and postman client
// 			return callback(null, true);
// 		}
// 		if (whitelist.indexOf(origin) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error("Not allowed by CORS"));
// 		}
// 	},
// 	credentials: true,
// };

app.use(cors());

app.use(express.json({
	type: ["application/json", "text/plain"],
}));
app.use(helmet());
app.use(xss());
app.use(morgan("tiny"));
// app.use(cors(
// 	{
// 		origin: "*",
// 	}
// ));
app.use('/api/v1', indexRouter)  // To move to the index.js file of the routers.
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server Running on " + `${port}`));
