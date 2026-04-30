import express from 'express';
import { loadIndianFoodData, searchFood } from '../../controllers/indianFood.controller.js';

const router = express.Router();

// Load CSV
router.post('/load-csv', loadIndianFoodData);

// Search
router.get('/search', searchFood);

export default router;