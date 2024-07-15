const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer'); // Import multer
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoute');
const workOrderRoutes = require('./routes/workOrderRoute');
const videoRoutes = require('./routes/videoRoute');
const quizRoutes = require('./routes/quizRoute');

const app = express();

// Middleware
app.use(
	cors({
		origin: 'https://tech-now-plum.vercel.app/',
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

// Configure multer for file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/'); // Specify the directory to store the uploaded files
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`); // Use a unique name for the file
	},
});

const upload = multer({ storage: storage });

// Routes
app.use(employeeRoutes);
app.use(workOrderRoutes);
app.use(videoRoutes);
app.use(quizRoutes);

// Route for file upload
app.post('/upload', upload.single('document'), (req, res) => {
	if (req.file) {
		res.status(200).json({
			message: 'File uploaded successfully',
			file: req.file,
		});
	} else {
		res.status(400).json({
			message: 'File not uploaded',
		});
	}
});

// MongoDB Connection
const uri = process.env.MONGODB_URI;
if (!uri) {
	console.error('MongoDB URI is not defined in the environment variables');
	process.exit(1); // Exit the application if URI is not defined
}

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('MongoDB connection error:', err);
	});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
