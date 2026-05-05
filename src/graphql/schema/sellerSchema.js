// src/graphql/schema/sellerSchema.js
import { gql } from 'apollo-server-express';

export const sellerTypeDefs = gql`
  # Seller Type
  type Seller {
    id: ID!
    name: String!
    email: String!
    city: String!
    rating: Float!
    createdAt: String!
    updatedAt: String!
  }

  # Input Types
  input CreateSellerInput {
    name: String!
    email: String!
    city: String!
    rating: Float!
  }

  # Seller Queries
  type Query {
    sellers: [Seller!]!
    seller(id: ID!): Seller
  }

  # Seller Mutations
  type Mutation {
    createSeller(input: CreateSellerInput!): Seller!
    deleteSeller(id: ID!): Boolean!
  }

  # Seller Subscriptions
  type Subscription {
    sellerCreated: Seller
  }
`;
