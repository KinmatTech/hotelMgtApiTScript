import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";

interface UserPayload {
    username: string;
    role: string;
}

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET!);

        res.status(200).json({ token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Edit user profile
export const editUserProfile = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;

        // Hash the password if provided
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update user data
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { username, password: hashedPassword, role },
            { new: true }
        );

        res.json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};