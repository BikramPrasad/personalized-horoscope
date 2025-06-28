const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.pattern.base': 'Name must contain only letters and spaces',
    }),

  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required',
  }),

  birthdate: Joi.date().less('now').required().messages({
    'date.base': 'Birthdate must be a valid date',
    'date.less': 'Birthdate cannot be in the future',
    'any.required': 'Birthdate is required',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
  }),

  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

module.exports = {
  userSchema,
  loginSchema,
};
