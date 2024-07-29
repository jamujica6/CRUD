import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import itemRoutes from './server/routes/itemRoutes.js';
import planetRoutes from './server/routes/planetRoutes.js';

// Cofig dotenv
dotenv.config();

const app = express();

// Middleware & Routes
app.use(express.json());
app.use('/api/items', itemRoutes);
app.use('/api/planets', planetRoutes);

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(() => {    
     console.log('MongoDB connection successful');
  })
  .catch(err => {
  console.error('Connection to MongoDB failed:', err);
});

// Root route
app.get('/', (req, res) => {
  res.send('¡Welcome to CRUD API!');
});

// Verifying an empty collection
// app.get('/api/items', (req, res) => {
//   const items = []; // Assuming the collection is empty 
//   res.status(200).json(items);
// });


// App exportation
export default app;


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

