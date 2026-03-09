import "reflect-metadata";
import "./infra/container/index.js";
import express from 'express';
import cors from "cors";
import morgan from "morgan";
import v1Router from './presentation/express/routes/v1/index.js'
import cookieParser from "cookie-parser";


const app = express();

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
    app.set('trust proxy', 1);
}

const corsOptions = {
    origin: isProduction ? process.env.CLIENT_URL : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(isProduction ? "combined" : "dev"));

app.use('/api/v1', v1Router);

export default app;