// src/graphql/schema/userSchema.js
import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  # User Type
  type User {
    id: ID!
    name: String!
    email: String!
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  # Auth Payload
  type AuthPayload {
    token: String!
    user: User!
  }

  # Input Types
  input CreateUserInput {
    name: String!
    email: String!
    isAdmin: Boolean!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  # User Queries
  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  # User Mutations
  type Mutation {
    register(input: CreateUserInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    createUser(input: CreateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }

  # User Subscriptions
  type Subscription {
    userCreated: User
  }
`;
