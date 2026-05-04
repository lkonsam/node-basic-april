import express from 'express';
import mongoose from 'mongoose';
import config from './src/config/config.js';
import createApolloServer from './src/graphql/apolloServer.js';

// REST Routes (keeping for now during migration)
import foodRoutes from './src/routes/v1/food.routes.js';
import sellerRoutes from './src/routes/v1/seller.routes.js';
import userRoutes from './src/routes/v1/user.route.js';

const app = express();

// Middleware (Apollo Server handles JSON parsing)
// app.use(express.json()); // Removed - Apollo Server handles this

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
  res.json({
    status: 'OK',
    message: 'API Running 🚀',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    success: false,
    message: message || 'Internal Server Error'
  });
});


// Start server with GraphQL
const startServer = async () => {
  try {
    await createApolloServer(app);

    // Add 404 handler after GraphQL setup
    app.use((req, res) => {
      if (req.path.startsWith('/graphql')) {
        return res.status(400).json({ message: 'Invalid GraphQL request' });
      }
      res.status(404).json({ message: 'Route Not Found' });
    });

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📊 GraphQL Playground: http://localhost:${config.port}/graphql`);
      console.log(`🔗 REST API: http://localhost:${config.port}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start Apollo Server:', error);
    process.exit(1);
  }
};

startServer();