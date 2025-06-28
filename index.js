const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const horoscopeRoutes = require('./routes/horoscope');
const rateLimiter = require('./middleware/rateLimiter')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


// Routes
app.use(rateLimiter);
app.use('/api/user', authRoutes);
app.use('/api/user', horoscopeRoutes);

// Invalid route handler
app.use((req, res) => {
  res.status(405).json({ message: 'Invalid route.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect DB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
