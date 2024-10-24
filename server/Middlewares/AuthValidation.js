const Joi = require('joi');

// Middleware function to validate user sign-up data
const signupValidation = (req, res, next) => {
    // Define the validation schema
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(100).required()
            .messages({
                'string.base': `"Username" should be a type of 'text'`,
                'string.empty': `"Username" cannot be an empty field`,
                'string.min': `"Username" should have a minimum length of {#limit}`,
                'string.max': `"Username" should have a maximum length of {#limit}`,
                'any.required': `"Username" is a required field`
            }),
        email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org'] } }).required()
            .messages({
                'string.email': `"Email" must be a valid email address`,
                'any.required': `"Email" is a required field`
            }),
            password: Joi.string()
            .min(8)
            .max(128)
            .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,128}$'))
            .required()
            .messages({
                'string.min': `"Password" must be at least {#limit} characters long. Please ensure it contains at least 8 characters.`,
                'string.max': `"Password" can be a maximum of {#limit} characters long. Please shorten your password if it exceeds this limit.`,
                'string.pattern.base': `"Password" must contain only letters, numbers, and special characters (!@#$%^&*). Please avoid any unsupported characters.`,
                'any.required': `"Password" is a required field. Please provide a password to continue.`
            }),
        
        role: Joi.string().valid('Agro Scientist', 'Farmer', 'Student', 'Others').required()
            .messages({
                'any.only': `"Role" must be one of 'Agro Scientist', 'Farmer', 'Student', or 'Others'`,
                'any.required': `"Role" is a required field`
            })
    });

    // Validate request body against the schema
    const { error } = schema.validate(req.body);

    // If validation fails, send a 400 response with error details
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    // If validation passes, proceed to the next middleware
    next();
};



// Middleware function for login validation
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
      .messages({
        'string.email': `"Email" must be a valid email address`,
        'any.required': `"Email" is a required field`,
      }),
    password: Joi.string().min(6).required()
      .messages({
        'string.min': `"Password" should have at least {#limit} characters`,
        'any.required': `"Password" is a required field`,
      }),
    // rememberMe: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next(); // Proceed if validation passes
};

module.exports = {
  signupValidation, loginValidation
}



