const mongoose = require('mongoose');


const EmployeesSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Make username unique
  pin: { type: String, required: true },
  role: { type: String, required: true, default: 'employee' },
});

EmployeesSchema.pre('save', async function (next) {
  if (!this.isModified('pin')) {
    return next();
  }

  next();
});

const EmployeeModel = mongoose.model('Employee', EmployeesSchema);
module.exports = EmployeeModel;
