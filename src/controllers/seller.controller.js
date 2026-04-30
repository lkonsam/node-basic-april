import * as sellerService from '../services/seller.service.js';
import * as foodService from "../services/indianFood.service.js";
import Seller from '../models/seller.model.js';

export const loadSellerData = async (req, res) => {
  try {
    const sellerData = await sellerService.loadSellerDataFromCSV();
    const foodData = await foodService.loadIndianFoodFromCSV() ;
    res.status(200).json({sellerData, foodData});
  } catch (err) {
    res.status(500).json({
      error: "Failed to load CSV data",
      details: err.message
    });
  }
};


export const createSeller = async (req, res) => {
  try {
    const seller = await sellerService.createSeller(req.body);
    res.status(201).json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getAllSellers = async (req, res) => {
  try {
    const sellers = await sellerService.getAllSeller();
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};