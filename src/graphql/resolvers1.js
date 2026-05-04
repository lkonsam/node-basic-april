// src/graphql/resolvers.js
import * as userService from '../services/user.service.js';
import * as foodService from '../services/indianFood.service.js';
import * as sellerService from '../services/seller.service.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.util.js';
import ApiError from '../utils/apiError.util.js';
import { validateGraphQLInput, registerValidation, loginValidation, updateUserValidation, createFoodValidation } from './validation.js';

const SALT_ROUNDS = 10;

export const resolvers = {
  // Query Resolvers
  Query: {
    // User queries
    users: async () => {
      const result = await userService.getAllUsers();
      return result.data;
    },

    user: async (_, { id }) => {
      const result = await userService.getUserById(id);
      return result.data;
    },

    profile: async (_, __, context) => {
      if (!context.user) {
        throw new ApiError(401, 'Unauthorized');
      }
      const result = await userService.getUserById(context.user.id);
      return result.data;
    },

    // Food queries
    foods: async () => {
      return await foodService.getAllIndianFood();
    },

    food: async (_, { id }) => {
      // You'll need to implement getFoodById in service
      const foods = await foodService.getAllIndianFood();
      return foods.find(food => food._id.toString() === id);
    },

    searchFoods: async (_, { query }) => {
      return await foodService.searchFood(query);
    },

    // Seller queries
    sellers: async () => {
      const result = await sellerService.getAllSeller();
      return result.data;
    },

    seller: async (_, { id }) => {
      // You'll need to implement getSellerById in service
      const result = await sellerService.getAllSeller();
      return result.data.find(seller => seller._id.toString() === id);
    }
  },

  // Mutation Resolvers
  Mutation: {
    // Auth mutations
    register: async (_, { input }) => {
      // Validate input
      validateGraphQLInput(registerValidation, input);

      const { name, email, password, isAdmin } = input;

      // Check duplicate
      const existing = await userService.getUserByEmail(email);
      if (existing.data) {
        throw new ApiError(400, 'Email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await userService.createUser({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false
      });

      const token = generateToken(user.data);

      return {
        token,
        user: user.data
      };
    },

    login: async (_, { input }) => {
      // Validate input
      validateGraphQLInput(loginValidation, input);

      const { email, password } = input;

      // You'll need to implement getUserByEmail in service
      const userResult = await userService.getUserByEmail(email);
      const user = userResult.data;

      if (!user) {
        throw new ApiError(400, 'Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new ApiError(400, 'Invalid credentials');
      }

      const token = generateToken(user);

      return {
        token,
        user
      };
    },

    // User mutations
    updateUser: async (_, { id, input }) => {
      const result = await userService.updateUser(id, input);
      return result.data;
    },

    // Food mutations
    createFood: async (_, { input }, context) => {
      if (!context.user) {
        throw new ApiError(401, 'Unauthorized');
      }

      // You'll need to implement createFood in service
      const food = await foodService.createFood(input, context.user.id);
      return food.data;
    },

    // Data loading mutations
    loadIndianFoodData: async () => {
      const result = await foodService.loadIndianFoodFromCSV();
      return {
        success: true,
        message: result.message,
        data: JSON.stringify({ count: result.count })
      };
    },

    loadSellerData: async () => {
      const result = await sellerService.loadSellerDataFromCSV();
      return {
        success: true,
        message: 'Seller data loaded successfully',
        data: JSON.stringify(result)
      };
    }
  }
};
