// src/graphql/schema/indianFoodSchema.js
import { gql } from 'apollo-server-express';

export const indianFoodTypeDefs = gql`
  # IndianFood Type
  type IndianFood {
    id: ID!
    name: String!
    ingredients: [String!]!
    diet: String
    prepTime: Int
    cookTime: Int
    flavorProfile: String
    course: String
    state: String
    region: String
    imageId: Int
    createdAt: String!
    updatedAt: String!
    seller_ids: [String!]
    sellers: [Seller!]
  }

  # Input Types
  input CreateIndianFoodInput {
    name: String!
    ingredients: [String!]!
    diet: String
    prepTime: Int
    cookTime: Int
    flavorProfile: String
    course: String
    state: String
    region: String
    imageId: Int
    seller_ids: [String!]
  }

  # IndianFood Queries
  type Query {
    indianFoods: [IndianFood!]!
    indianFood(id: ID!): IndianFood
    searchIndianFoods(query: String!): [IndianFood!]!
  }

  # IndianFood Mutations
  type Mutation {
    createIndianFood(input: CreateIndianFoodInput!): IndianFood!
    deleteIndianFood(id: ID!): Boolean!
  }

  # IndianFood Subscriptions
  type Subscription {
    indianFoodCreated: IndianFood
  }
`;
