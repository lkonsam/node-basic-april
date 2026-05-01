// validations/user.validation.js
import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  isAdmin: Joi.boolean().optional() // you can ignore this in controller if needed
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});