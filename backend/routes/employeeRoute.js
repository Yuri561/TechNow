const express = require('express');
const router = express.Router();
const { getEmployees, registerEmployee, loginEmployee } = require('../controllers/employeeController');

router.get('/employees', getEmployees);
router.post('/register', registerEmployee);
router.post('/login', loginEmployee);

module.exports = router;
