import * as sellerService from '../services/seller.service.js';
import * as foodService from "../services/indianFood.service.js";
import Seller from '../models/seller.model.js';
import catchAsync from '../utils/catchAsync.util.js';
import ApiError from '../utils/apiError.util.js';

export const loadSellerData = catchAsync(async (req, res) => {
  const sellerData = await sellerService.loadSellerDataFromCSV();
  const foodData = await foodService.loadIndianFoodFromCSV();
  res.status(200).json({
    success: true,
    data: {
      sellerData,
      foodData
    }
  });
});


export const createSeller = catchAsync(async (req, res) => {
  const seller = await sellerService.createSeller(req.body);
  res.status(201).json({
    success: true,
    data: seller
  });
});


export const getAllSellers = catchAsync(async (req, res) => {
  const sellers = await sellerService.getAllSeller();
  res.json({
    success: true,
    data: sellers
  });
});