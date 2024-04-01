"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Middleware to authenticate users
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.authenticateUser = authenticateUser;
// Middleware to authorize admin users
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: 'Access denied. Admin privilege required.' });
    }
};
exports.authorizeAdmin = authorizeAdmin;
