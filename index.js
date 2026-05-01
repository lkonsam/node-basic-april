import express from 'express';
import mongoose from 'mongoose';
import config from './src/config/config.js';

import foodRoutes from './src/routes/v1/food.routes.js';
import sellerRoutes from './src/routes/v1/seller.routes.js';
import userRoutes from './src/routes/v1/user.route.js';

const app = express();

// Middleware
app.use(express.json());

// DB Connection
mongoose.connect(config.mongoose.url)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ DB Error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/foods', foodRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api', (req, res) => {
  res.send('API Running 🚀');
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

//server starting
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});