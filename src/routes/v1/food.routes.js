import express from 'express';
import { loadIndianFoodData, searchFood, getAllIndianFood } from '../../controllers/indianFood.controller.js';

const router = express.Router();

// Load CSV
router.post('/load-csv', loadIndianFoodData);

// all
router.get('/', getAllIndianFood);
// Search
router.get('/search', searchFood);

export default router;