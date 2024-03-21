import joi from 'joi';

// Joi schema for user data validation
const userSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().valid('guest', 'admin').default('guest')
});

// Middleware for validating user data
export const validateUserData = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};
