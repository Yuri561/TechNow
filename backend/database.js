const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yui561:Houbenove561%24@cluster0.c3jn9rd.mongodb.net/CompanyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
