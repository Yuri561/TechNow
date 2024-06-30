const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoute');
const workOrderRoutes = require('./routes/workOrderRoute');
const videoRoutes = require('./routes/videoRoute');
const quizRoutes = require('./routes/quizRoute');

const app = express();

// Middleware
app.use(
	cors({
		origin: ['https://technow.vercel.app', 'http://localhost:5173'],
		methods: ['POST', 'GET', 'DELETE', 'PUT'],
		credentials: true,
	})
);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});



app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/workorders', workOrderRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/quizzes', quizRoutes);



// MongoDB Connection
const uri = process.env.MONGODB_URI || 'your-default-mongodb-uri-here';
if (!uri) {
	console.error('MongoDB URI is not defined in the environment variables');
	process.exit(1); // Exit the application if URI is not defined
}

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('MongoDB connection error:', err);
	});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
