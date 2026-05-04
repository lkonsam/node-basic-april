// src/graphql/apolloServer.js
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
// import typeDefs from './typeDefs1.js';
// import { resolvers } from './resolvers1.js';

import { typeDefs, resolvers } from './typeDefs.js';

// Authentication context
const createContext = async ({ req }) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt_secret);
      return { user: decoded };
    } catch (err) {
      // Invalid token
      return { user: null };
    }
  }

  return { user: null };
};

// Create Apollo Server
const createApolloServer = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
    introspection: true, // Enable GraphQL Playground
    playground: true,   // Enable GraphQL Playground
    formatError: (err) => {
      // Custom error formatting
      return {
        message: err.message,
        code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
        statusCode: err.extensions?.statusCode || 500
      };
    }
  });

  await server.start();

  // Apply middleware with proper body parser
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: '*',
      credentials: true
    }
  });

  return server;
};

export default createApolloServer;
