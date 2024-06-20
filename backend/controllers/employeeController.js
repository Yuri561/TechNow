const EmployeeModel = require('../models/Employees');

const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const registerEmployee = async (req, res) => {
  try {
    const { username, pin } = req.body;
    const newEmployee = new EmployeeModel({ username, pin });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginEmployee = async (req, res) => {
  const { username, pin } = req.body;
  try {
    const user = await EmployeeModel.findOne({ username });
    if (user) {
      if (pin === user.pin) {
        res.status(200).json('Success');
        console.log(`${username} successfully authenticated`);
      } else {
        res.status(400).json('Incorrect PIN');
      }
    } else {
      res.status(400).json('No records existed');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getEmployees,
  registerEmployee,
  loginEmployee
};
