// src/graphql/schema/index.js
import { userTypeDefs } from './userSchema.js';
import { sellerTypeDefs } from './sellerSchema.js';
import { indianFoodTypeDefs } from './indianFoodSchema.js';
import { gql } from 'apollo-server-express';

// Combine all type definitions
export const typeDefs = gql`
  ${userTypeDefs}
  ${sellerTypeDefs}
  ${indianFoodTypeDefs}
`;
