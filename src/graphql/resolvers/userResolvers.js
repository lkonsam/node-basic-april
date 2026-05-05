// src/graphql/resolvers/userResolvers.js
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt.util.js';
import * as userService from '../../services/user.service.js';

export const userResolvers = {
  Query: {
    users: () => userService.getAllUsers(),
    user: (_, { id }) => userService.getUserById(id)
  },

  Mutation: {
    register: async (_, { input }) => {
      const { name, email, isAdmin } = input;

      // Create user (service handles validation)
      const user = await userService.createUser({ name, email, isAdmin });

      // Generate token (you'd get password from input in real app)
      const token = generateToken({ id: user.id, email: user.email });

      return {
        token,
        user
      };
    },

    login: async (_, { input }) => {
      const { email, password } = input;

      const user = userService.getUserByEmail(email);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = generateToken({ id: user.id, email: user.email });

      // Return user without password
      const { password: userPassword, ...userWithoutPassword } = user;

      return {
        token,
        user: userWithoutPassword
      };
    },

    createUser: async (_, { input }) => {
      return await userService.createUser(input);
    },

    deleteUser: (_, { id }) => {
      return userService.deleteUser(id);
    }
  }
};
