const userService = require('../services/userService');
const { sendSuccess } = require('../utils/response');

const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, role, status } = req.query;
    const result = await userService.getAllUsers({ page: parseInt(page) || 1, limit: parseInt(limit) || 20, role, status });
    sendSuccess(res, 200, 'Users retrieved successfully', result);
  } catch (err) { next(err); }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const user = await userService.updateUserStatus(req.params.id, req.body.status);
    sendSuccess(res, 200, 'User status updated', { user });
  } catch (err) { next(err); }
};

module.exports = { getAllUsers, updateUserStatus };