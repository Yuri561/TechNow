const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const { getEmployees, registerEmployee, loginEmployee } = require('../controllers/employeeController');

router.get('/employees', protect, getEmployees);
router.post('/register', registerEmployee);
router.post('/login', loginEmployee);

module.exports = router;
