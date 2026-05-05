// src/graphql/resolvers/index.js
import { userResolvers } from './userResolvers.js';
import { sellerResolvers } from './sellerResolvers.js';
import { indianFoodResolvers } from './indianFoodResolvers.js';

// Combine all resolvers
export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...sellerResolvers.Query,
    ...indianFoodResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...sellerResolvers.Mutation,
    ...indianFoodResolvers.Mutation,
  },
  // Field resolvers
  ...indianFoodResolvers.IndianFood
};
