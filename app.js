import express from 'express';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';  // Assuming you are using Mongoose to connect to MongoDB
import companyRoutes from './routes/companyRoutes.js';  // Add .js extension for ES Modules
import notificationRoutes from './routes/notificationRoutes.js';
import userRoutes from './routes/userRoutes.js';

import cors from 'cors';  // Correct import for CORS

const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connect('mongodb://localhost:27017/notifications_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    //protect(req, res);
    next();
});

// Use routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/user', userRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
