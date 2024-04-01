"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserData = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi schema for user data validation
const userSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    role: joi_1.default.string().valid('guest', 'admin').default('guest')
});
// Middleware for validating user data
const validateUserData = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
};
exports.validateUserData = validateUserData;
