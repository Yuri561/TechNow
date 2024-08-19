// middleware/multer.js

const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, 'uploads'); // Use __dirname to get the directory of the current module

// Check if the directory exists, and create it if it doesn't
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, 'uploads')); // Ensure the path is always correct
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
