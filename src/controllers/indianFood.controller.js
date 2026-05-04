import * as foodService from "../services/indianFood.service.js";
import catchAsync from '../utils/catchAsync.util.js';
import ApiError from '../utils/apiError.util.js';

export const loadIndianFoodData = catchAsync(async (req, res) => {
  const result = await foodService.loadIndianFoodFromCSV();
  res.status(200).json({
    success: true,
    data: result
  });
});


export const createFood = catchAsync(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized - User ID required');
  }

  const food = await foodService.createFood(req.body, req.user._id);
  res.status(201).json({
    success: true,
    data: food
  });
});


export const getAllIndianFood = catchAsync(async (req, res) => {
  const result = await foodService.getAllIndianFood();
  res.json({
    success: true,
    data: result
  });
});

export const searchFood = catchAsync(async (req, res) => {
  if (!req.query.q) {
    throw new ApiError(400, 'Search query is required');
  }

  const result = await foodService.searchFood(req.query.q);
  res.json({
    success: true,
    data: result
  });
});

