import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../src/models/UserModel.ts";

interface DecodedToken {
    id: string; // Add id property
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
    } catch (error: any) { // Specify 'any' type for error
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
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET!);

        res.status(200).json({ token });
    } catch (error: any) { // Specify 'any' type for error
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const decodedToken = req.user as DecodedToken;
        const user = await User.findById(decodedToken.id).select('-password');
        res.json(user);
    } catch (error: any) { // Specify 'any' type for error
        res.status(500).json({ message: error.message });
    }
};

// Edit user profile
export const editUserProfile = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;

        // Hash the password if provided
        let hashedPassword: string | null = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update user data
        const updatedUser = await User.findByIdAndUpdate(
            req.user?.role, // Use optional chaining to access id property
            { username, password: hashedPassword, role },
            { new: true }
        );

        res.json(updatedUser);
    } catch (error: any) { // Specify 'any' type for error
        res.status(500).json({ message: error.message });
    }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.user?.role); // Use optional chaining to access id property
        res.json({ message: "User deleted successfully" });
    } catch (error: any) { // Specify 'any' type for error
        res.status(500).json({ message: error.message });
    }
};
