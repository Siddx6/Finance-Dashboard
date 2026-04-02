const sendSuccess = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({ status: 'success', message, ...data });
};

const sendError = (res, statusCode, message, errors = null) => {
  const response = { status: 'fail', message };
  if (errors) response.errors = errors;
  res.status(statusCode).json(response);
};

module.exports = { sendSuccess, sendError };