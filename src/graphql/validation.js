// src/graphql/validation.js
import Joi from 'joi';

// GraphQL validation schemas
export const registerValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  isAdmin: Joi.boolean().optional()
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const updateUserValidation = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  isAdmin: Joi.boolean().optional()
}).min(1); // At least one field is required

export const createFoodValidation = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).min(1).required(),
  diet: Joi.string().optional(),
  prepTime: Joi.number().integer().min(0).optional(),
  cookTime: Joi.number().integer().min(0).optional(),
  flavorProfile: Joi.string().optional(),
  course: Joi.string().optional(),
  state: Joi.string().optional(),
  region: Joi.string().optional()
});

// Validation middleware for GraphQL
export const validateGraphQLInput = (schema, input) => {
  const { error } = schema.validate(input, { abortEarly: false });
  
  if (error) {
    const validationErrors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    throw new Error(`Validation Error: ${validationErrors.map(e => e.message).join(', ')}`);
  }
  
  return true;
};
