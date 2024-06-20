const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();  // This line loads environment variables from .env file

const employeeRoutes = require('./routes/employeeRoute');
const workOrderRoutes = require('./routes/workOrderRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', employeeRoutes);
app.use('/api', workOrderRoutes);

// MongoDB Connection
const uri = 'mongodb+srv://yui561:Houbenove561%24@cluster0.c3jn9rd.mongodb.net/CompanyDB?retryWrites=true&w=majority&appName=Cluster0';
if (!uri) {
  console.error('MongoDB URI is not defined in the environment variables');
  process.exit(1);  // Exit the application if URI is not defined
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
