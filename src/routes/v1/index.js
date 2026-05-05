// src/routes/v1/index.js
import express from 'express';
import foodRoutes from './food.routes.js';
import sellerRoutes from './seller.routes.js';
import userRoutes from './user.route.js';

const router = express.Router();

// Health check for REST API
router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'REST API Running 🚀',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Mount all REST routes
router.use('/foods', foodRoutes);
router.use('/sellers', sellerRoutes);
router.use('/users', userRoutes);

export default router;
