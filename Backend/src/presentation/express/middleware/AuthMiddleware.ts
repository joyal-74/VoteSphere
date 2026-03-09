import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Access token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as any;
        (req as any).userId = decoded.userId; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Access token expired" });
    }
};