import * as foodService from "../services/indianFood.service.js";

export const loadIndianFoodData = async (req, res) => {
  try {
    const result = await foodService.loadIndianFoodFromCSV() ;
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to load CSV data", details: err.message });
  }
};


export const createFood = async (req, res) => {
    const food = await foodService.createFood(req.body, req.user._id);
    res.status(201).json(food);
};

export const searchFood = async (req, res) => {
    const result = await foodService.searchFood(req.query.q);
    res.json(result);
};

