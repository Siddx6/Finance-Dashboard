const FinancialRecord = require('../models/FinancialRecord');

const BASE_MATCH = { isDeleted: false };

const getSummary = async () => {
  const result = await FinancialRecord.aggregate([
    { $match: BASE_MATCH },
    { $group: { _id: '$type', total: { $sum: '$amount' }, count: { $sum: 1 } } },
  ]);
  const summary = { totalIncome: 0, totalExpenses: 0, incomeCount: 0, expenseCount: 0 };
  result.forEach(({ _id, total, count }) => {
    if (_id === 'income') { summary.totalIncome = total; summary.incomeCount = count; }
    else { summary.totalExpenses = total; summary.expenseCount = count; }
  });
  summary.netBalance = parseFloat((summary.totalIncome - summary.totalExpenses).toFixed(2));
  summary.totalIncome = parseFloat(summary.totalIncome.toFixed(2));
  summary.totalExpenses = parseFloat(summary.totalExpenses.toFixed(2));
  return summary;
};

const getCategoryBreakdown = async () => {
  return FinancialRecord.aggregate([
    { $match: BASE_MATCH },
    { $group: { _id: { category: '$category', type: '$type' }, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    { $sort: { total: -1 } },
    { $group: { _id: '$_id.category', breakdown: { $push: { type: '$_id.type', total: { $round: ['$total', 2] }, count: '$count' } }, categoryTotal: { $sum: '$total' } } },
    { $sort: { categoryTotal: -1 } },
    { $project: { _id: 0, category: '$_id', breakdown: 1, categoryTotal: { $round: ['$categoryTotal', 2] } } },
  ]);
};

const getMonthlyTrends = async () => {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
  twelveMonthsAgo.setDate(1);
  twelveMonthsAgo.setHours(0, 0, 0, 0);

  return FinancialRecord.aggregate([
    { $match: { ...BASE_MATCH, date: { $gte: twelveMonthsAgo } } },
    { $group: { _id: { year: { $year: '$date' }, month: { $month: '$date' }, type: '$type' }, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $group: { _id: { year: '$_id.year', month: '$_id.month' }, data: { $push: { type: '$_id.type', total: { $round: ['$total', 2] }, count: '$count' } } } },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $project: { _id: 0, year: '$_id.year', month: '$_id.month', period: { $concat: [{ $toString: '$_id.year' }, '-', { $cond: [{ $lt: ['$_id.month', 10] }, { $concat: ['0', { $toString: '$_id.month' }] }, { $toString: '$_id.month' }] }] }, data: 1 } },
  ]);
};

const getRecentTransactions = async (limit = 10) => {
  return FinancialRecord.find(BASE_MATCH).populate('user', 'name email').sort({ date: -1 }).limit(Math.min(limit, 50));
};

module.exports = { getSummary, getCategoryBreakdown, getMonthlyTrends, getRecentTransactions };