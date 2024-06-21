const express = require('express');
const router = express.Router();
const {
	getVideos,
	createVideo,
	deleteVideo,
} = require('../controllers/videoController');

router.get('/workorders', getVideos);
router.post('/workorders', createVideo);
router.delete('/workorders/:id', deleteVideo); // Ensure the route includes ':id'

module.exports = router;
