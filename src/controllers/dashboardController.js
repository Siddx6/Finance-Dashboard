const dashboardService = require('../services/dashboardService');
const { sendSuccess } = require('../utils/response');

const getSummary = async (req, res, next) => {
  try {
    const summary = await dashboardService.getSummary();
    sendSuccess(res, 200, 'Dashboard summary retrieved', { summary });
  } catch (err) { next(err); }
};

const getCategoryBreakdown = async (req, res, next) => {
  try {
    const breakdown = await dashboardService.getCategoryBreakdown();
    sendSuccess(res, 200, 'Category breakdown retrieved', { breakdown });
  } catch (err) { next(err); }
};

const getMonthlyTrends = async (req, res, next) => {
  try {
    const trends = await dashboardService.getMonthlyTrends();
    sendSuccess(res, 200, 'Monthly trends retrieved', { trends });
  } catch (err) { next(err); }
};

const getRecentTransactions = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const transactions = await dashboardService.getRecentTransactions(limit);
    sendSuccess(res, 200, 'Recent transactions retrieved', { transactions });
  } catch (err) { next(err); }
};

module.exports = { getSummary, getCategoryBreakdown, getMonthlyTrends, getRecentTransactions };