// src/graphql/resolvers/indianFoodResolvers.js
import * as indianFoodService from '../../services/indianFood.service.js';
import * as sellerService from '../../services/seller.service.js';

export const indianFoodResolvers = {
  Query: {
    indianFoods: () => indianFoodService.getAllIndianFood(),
    indianFood: (_, { id }) => indianFoodService.getIndianFoodById(id),
    searchIndianFoods: (_, { query }) => {
      return indianFoodService.searchFood(query);
    }
  },

  Mutation: {
    createIndianFood: (_, { input }) => {
      return indianFoodService.createFood(input);
    },

    deleteIndianFood: (_, { id }) => {
      return indianFoodService.deleteFood(id);
    }
  },

  // // Field resolvers for relationships
  // IndianFood: {
  //   sellers: (food) => {
  //     if (!food.seller_ids || food.seller_ids.length === 0) {
  //       return [];
  //     }
  //     const sellerData = sellerService.getAllSeller();
  //     const sellers = food.seller_ids.map(seller_id =>
  //       sellerData.find(seller => seller.id === seller_id)
  //     ).filter(Boolean); // Remove undefined sellers
  //     return sellers;
  //   }
  // }
};
