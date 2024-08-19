// routes/workOrderRoute.js

const express = require('express');
const router = express.Router();
const {
	getWorkOrders,
	createWorkOrder,
	updateWorkOrder,
	deleteWorkOrder,
	uploadDocument,
} = require('../controllers/workOrderController');
const upload = require('../middleware/multer');

// Define work order routes
router.get('/workorders', getWorkOrders);
router.post('/workorders', createWorkOrder);
router.put('/workorders/:id', updateWorkOrder);
router.delete('/workorders/:id', deleteWorkOrder);
router.post('/upload/:id', upload.single('document'), uploadDocument); // Use upload middleware for this route

module.exports = router;
