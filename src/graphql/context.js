// src/graphql/context.js
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

// Create context for GraphQL requests
export const createContext = async ({ req }) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt_secret);
      return { 
        user: decoded,
        isAuthenticated: true
      };
    } catch (err) {
      // Invalid token
      return { 
        user: null,
        isAuthenticated: false
      };
    }
  }
  
  return { 
    user: null,
    isAuthenticated: false
  };
};

// Authentication middleware for protected mutations
export const requireAuth = (context) => {
  if (!context.isAuthenticated) {
    throw new Error('Authentication required');
  }
  return context.user;
};
