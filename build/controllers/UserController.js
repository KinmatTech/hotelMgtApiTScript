"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUserProfile = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        // Check if the username is already taken
        const existingUser = yield UserModel_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new user
        const newUser = new UserModel_1.default({
            username,
            password: hashedPassword,
            role
        });
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Check if the user exists
        const user = yield UserModel_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Check if the password is correct
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.loginUser = loginUser;
// Get user profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserProfile = getUserProfile;
// Edit user profile
const editUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        // Hash the password if provided
        let hashedPassword = null;
        if (password) {
            hashedPassword = yield bcrypt_1.default.hash(password, 10);
        }
        // Update user data
        const updatedUser = yield UserModel_1.default.findByIdAndUpdate(req.user.id, { username, password: hashedPassword, role }, { new: true });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.editUserProfile = editUserProfile;
// Delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserModel_1.default.findByIdAndDelete(req.user.id);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
