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
const allowedOrigins = ['https://tech-client-flax.vercel.app', 'tech-client-ookfck4j7-impact-team-5e808f93.vercel.app'];
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
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(employeeRoutes);
app.use(workOrderRoutes);
app.use(videoRoutes);
app.use(quizRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send({ message: 'hello world from server' });
});

// MongoDB Connection
const uri = process.env.MONGODB_URI || 'mongodb+srv://yui561:Houbenove561%24@cluster0.c3jn9rd.mongodb.net/CompanyDB?retryWrites=true&w=majority&appName=Cluster0';
if (!uri) {
    console.error('MongoDB URI is not defined in the environment variables');
    process.exit(1); // Exit the application if URI is not defined
}

mongoose.connect(uri, {
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
