const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Authentication token missing', 401));
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError('User no longer exists', 401));
    if (user.status === 'inactive') return next(new AppError('Account is inactive. Contact administrator.', 403));

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') return next(new AppError('Token expired. Please log in again.', 401));
    if (err.name === 'JsonWebTokenError') return next(new AppError('Invalid token', 401));
    next(err);
  }
};

module.exports = { protect };