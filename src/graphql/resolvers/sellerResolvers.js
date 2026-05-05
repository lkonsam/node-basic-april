// src/graphql/resolvers/sellerResolvers.js
import * as sellerService from '../../services/seller.service.js';

export const sellerResolvers = {
  Query: {
    sellers: () => sellerService.getAllSeller(),
    seller: (_, { id }) => sellerService.getSellerById(id)
  },

  Mutation: {
    createSeller: (_, { input }) => {
      return sellerService.createSeller(input);
    },

    deleteSeller: (_, { id }) => {
      return sellerService.deleteSeller(id);
    }
  }
};
