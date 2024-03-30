import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken {
    username: string;
    role: string;
}

// Extend the Express Request interface to include a 'user' property
declare global {
    namespace Express {
        interface Request {
            user?: DecodedToken;
        }
    }
}

// Middleware to authenticate users
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT secret is not defined.');
        }
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        req.user = decoded as DecodedToken;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            // JWT error handling
            return res.status(401).json({ message: 'Invalid token.' });
        } else if (error instanceof jwt.TokenExpiredError) {
            // Token expiration error handling
            return res.status(401).json({ message: 'Token expired.' });
        }
        // General error handling
       // res.status(400).json({ message: error.message });
    }
};

// Middleware to authorize admin users
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin privilege required.' });
    }
};
