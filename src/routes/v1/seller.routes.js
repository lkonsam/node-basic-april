import express from 'express';
import { createSeller, getAllSellers, loadSellerData } from '../../controllers/seller.controller.js';

const router = express.Router();

//load csv
router.post('/load-csv', loadSellerData);

// Create seller
router.post('/', createSeller);

// Get all sellers
router.get('/', getAllSellers);

export default router;