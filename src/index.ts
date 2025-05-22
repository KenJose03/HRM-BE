import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import hrRouter from "./routes/hrDash";
import { authMiddleware } from "./middlewares/auth";
import { User } from './schema/UserModels';
import { z } from 'zod';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getUser } from './controllers/user';
import cookieParser from 'cookie-parser';
import { SignIn, SignUp } from './controllers/auth';
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/authRoutes";
import "./config/passport";


dotenv.config();

// {   
//     "username": "roman",
//     "email":"roman@gmail.com",
//     "password": "eQewqd1esz@"
//  }




const main = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.log(err);
    }
}

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(session({ secret: process.env.SESSION_SECRET as string, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/hr", hrRouter)
app.use("/auth", authRoutes);

app.listen(3000, () => {
    main();
    console.log('Server is running on port 3000');
})
