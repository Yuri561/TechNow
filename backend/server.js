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
    'https://tech-now-plum.vercel.app/tool-box',
    'https://tech-now-plum.vercel.app/new-work-order-form',
    'https://tech-now-plum.vercel.app/docs-upload',
    'https://tech-now-plum.vercel.app/generate-receipt'
   
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));



// Set headers for all responses
app.use((req, res, next) => {
    const origin = req.header('Origin');
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.options('*', cors())
app.use(express.json());
app.use(cookieParser());
// Root Route
app.get('/', (req, res) => {
    res.send({ message: 'hello world from server' });
});

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
