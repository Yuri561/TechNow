const express = require('express');
const router = express.Router();
const { getWorkOrders, createWorkOrder, deleteWorkOrder } = require('../controllers/workOrderController');
const protect = require('../middleware/protect');
router.get('/workorders', getWorkOrders);
router.post('/workorders', createWorkOrder);
router.delete('/workorders/:id', deleteWorkOrder); // Ensure the route includes ':id'

module.exports = router;
