const User = require('../models/User');
const AppError = require('../utils/AppError');

const getAllUsers = async ({ page = 1, limit = 20, role, status }) => {
  const filter = {};
  if (role) filter.role = role;
  if (status) filter.status = status;
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);
  return { users, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
};

const updateUserStatus = async (id, status) => {
  const user = await User.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  if (!user) throw new AppError('User not found', 404);
  return user;
};

module.exports = { getAllUsers, updateUserStatus };