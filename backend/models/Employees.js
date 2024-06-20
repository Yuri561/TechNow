const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EmployeesSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Make username unique
  pin: { type: String, required: true },
});

EmployeesSchema.pre('save', async function (next) {
  if (!this.isModified('pin')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.pin = await bcrypt.hash(this.pin, salt);
  next();
});

const EmployeeModel = mongoose.model('Employee', EmployeesSchema);
module.exports = EmployeeModel;