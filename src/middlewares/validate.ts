import joi, { ValidationResult } from 'joi';
import { Request, Response, NextFunction } from 'express';

// Define the shape of the user data
interface UserData {
    username: string;
    password: string;
    role: 'guest' | 'admin';
}

// Joi schema for user data validation
const userSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().valid('guest', 'admin').default('guest')
});

// Middleware for validating user data
export const validateUserData = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};
