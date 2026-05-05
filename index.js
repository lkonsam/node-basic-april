import express from 'express';
import mongoose from 'mongoose';
import config from './src/config/config.js';
import { createApolloServer } from './src/graphql/server.js';

// REST Routes (for testing alongside GraphQL)
import apiRoutes from './src/routes/v1/index.js';

const app = express();

// DB Connection
mongoose.connect(config.mongoose.url)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ DB Error:', err);
    process.exit(1);
  });


// Mount REST API routes
app.use('/api', apiRoutes);

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
      console.log(`🏥 REST Health Check: http://localhost:${config.port}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start Apollo Server:', error);
    process.exit(1);
  }
};

startServer();