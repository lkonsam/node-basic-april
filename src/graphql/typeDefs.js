// src/graphql/typeDefs.js
import { gql } from 'apollo-server-express';


const userData = [
  {
    id: '1', name: 'John Doe', email: 'john@example.com', isAdmin: false, createdAt: '2023-01-01T00:00:00.000Z', updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2', name: 'Jane Smith', email: 'jane@example.com', isAdmin: true, createdAt: '2023-01-01T00:00:00.000Z', updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '3', name: 'Admin User', email: 'admin@example.com', isAdmin: true, createdAt: '2023-01-01T00:00:00.000Z', updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '4', name: 'Test User', email: 'test@example.com', isAdmin: false, createdAt: '2023-01-01T00:00:00.000Z', updatedAt: '2023-01-01T00:00:00.000Z',
  },
];

const travelData = [
  {
    id: '1',
    name: 'Travel 1',
    description: 'Description 1',
    price: 100,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    user_ids: ['3', '2']
  },
  {
    id: '2',
    name: 'Travel 2',
    description: 'Description 2',
    price: 200,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    user_ids: ['1', '2', '4']
  }
];



export const typeDefs = gql`
  # User Types
  type User {
    id: ID!
    name: String!
    email: String!
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  # Travel Types
  type Travel {
    id: ID!
    name: String!
    description: String!
    price: Float!
    createdAt: String!
    updatedAt: String!
    user_ids: [String!],
    users: [User!]
  }
  
  #Reading Operations (Getting data)
  type Query { 
    getUsers: [User!]!
    getTravels: [Travel!]!
    getUserById(id: ID!): User
    getTravelById(id: ID!): Travel
  }

  #Writing Operations (Creating, Updating, Deleting)
  type Mutation {
    createUser(name: String!, email: String!, isAdmin: Boolean!): User
    createTravel(name: String!, description: String!, price: Float!, user_id: String!): Travel
    deleteUser(id: ID!): Boolean
    deleteTravel(id: ID!): Boolean
  }

  #Subscriptions (Real-time updates)
  type Subscription {
    userCreated: User
    travelCreated: Travel
  }

`;



export const resolvers = {
  // Query: Get data
  Query: {
    getUsers: () => userData,
    getTravels: () => travelData,
    getUserById: (_, { id }) => userData.find(user => user.id === id),
    getTravelById: (_, { id }) => travelData.find(travel => travel.id === id)
  },

  // Field resolver: Add user to travel
  Travel: {
    users: (travel) => travel.user_ids.map(user_id => userData.find(user => user.id === user_id))
  },
  // Mutation: Create/update/delete data
  Mutation: {
    createUser: (_, { name, email, isAdmin }) => {
      const user = {
        id: String(userData.length + 1),
        name,
        email,
        isAdmin,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      userData.push(user);
      return user;
    },
    createTravel: (_, { name, description, price, user_ids }) => {
      const travel = {
        id: String(travelData.length + 1),
        name,
        description,
        price,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user_ids
      };
      travelData.push(travel);
      return travel;
    },
    deleteUser: (_, { id }) => {
      const user = userData.find(user => user.id === id);
      if (!user) {
        return false;
      }
      userData.splice(userData.indexOf(user), 1);
      return true;
    },
    deleteTravel: (_, { id }) => {
      const travel = travelData.find(travel => travel.id === id);
      if (!travel) {
        return false;
      }
      travelData.splice(travelData.indexOf(travel), 1);
      return true;
    }
  }
};


