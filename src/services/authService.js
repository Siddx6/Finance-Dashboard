const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const register = async (userData) => {
  const user = await User.create(userData);
  const token = signToken(user._id);
  return { user, token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new AppError('Invalid email or password', 401);
  if (user.status === 'inactive') throw new AppError('Account is inactive. Contact administrator.', 403);
  const token = signToken(user._id);
  return { user, token };
};

module.exports = { register, login };