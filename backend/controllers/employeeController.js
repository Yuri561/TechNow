const EmployeeModel = require('../models/Employees');
const generateToken = require('../utils/generateToken');

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
 const userExists = await EmployeeModel.findOne({ email });

 if (userExists) {
		res.status(400);
		throw new Error('User already exists');
 }

 const user = await EmployeeModel.create({
		username,
		email,
		pin,
 });

 if (user) {
		generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
 } else {
		res.status(400);
		throw new Error('Invalid user data');
 }
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
const loginEmployee = async (req, res) => {
	const { username, pin, _id } = req.body;
	if (!username || !pin || !_id) {
		return res.status(400).json({ message: 'Username and PIN are required' });
	}

	try {
		const user = await EmployeeModel.findOne({ username });
		 if (user && (await user.comparePin(pin))) {
				generateToken(res, user._id);

				res.status(200).json({
					_id: user._id,
					username: user.username,
					role: user.role,
        });
       
			} else {
				res.status(401);
				throw new Error('Invalid email or password');
			}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};


module.exports = {
	getEmployees,
	registerEmployee,
	loginEmployee,
};
