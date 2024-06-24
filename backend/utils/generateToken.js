const jwt  =  require('jsonwebtoken');
const JWT_SECRET = '1976';
const generateToken = (res, id) => {
    const token = jwt.sign({ id }, JWT_SECRET, {
			expiresIn: '30d',
		}); // this is creating the token

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
    })
}

module.exports = generateToken;