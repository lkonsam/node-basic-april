// src/graphql/typeDefs.js
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # User Types
  type User {
    id: ID!
    name: String!
    email: String!
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  # Seller Types
  type Seller {
    id: ID!
    name: String!
    location: String!
    createdAt: String!
    updatedAt: String!
  }

  # Indian Food Types
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
    sellers: [Seller!]!
    createdAt: String!
    updatedAt: String!
  }

  # Auth Types
  type AuthPayload {
    token: String!
    user: User!
  }

  # Input Types
  input RegisterInput {
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    isAdmin: Boolean
  }

  input CreateFoodInput {
    name: String!
    ingredients: [String!]!
    diet: String
    prepTime: Int
    cookTime: Int
    flavorProfile: String
    course: String
    state: String
    region: String
  }

  # Response Types
  type Response {
    success: Boolean!
    message: String!
    data: String
  }

  # Queries
  type Query {
    # User queries
    users: [User!]!
    user(id: ID!): User!
    profile: User!

    # Food queries
    foods: [IndianFood!]!
    food(id: ID!): IndianFood!
    searchFoods(query: String!): [IndianFood!]!

    # Seller queries
    sellers: [Seller!]!
    seller(id: ID!): Seller!
  }

  # Mutations
  type Mutation {
    # Auth mutations
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!

    # User mutations
    updateUser(id: ID!, input: UpdateUserInput!): User!

    # Food mutations
    createFood(input: CreateFoodInput!): IndianFood!
    
    # Data loading mutations
    loadIndianFoodData: Response!
    loadSellerData: Response!
  }
`;

export default typeDefs;
