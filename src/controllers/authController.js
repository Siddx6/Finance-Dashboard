const authService = require('../services/authService');
const { sendSuccess } = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body);
    sendSuccess(res, 201, 'Registration successful', { token, user });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body.email, req.body.password);
    sendSuccess(res, 200, 'Login successful', { token, user });
  } catch (err) { next(err); }
};

const getMe = (req, res) => {
  sendSuccess(res, 200, 'Current user retrieved', { user: req.user });
};

module.exports = { register, login, getMe };