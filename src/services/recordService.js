const FinancialRecord = require('../models/FinancialRecord');
const AppError = require('../utils/AppError');

const buildFilter = ({ type, category, startDate, endDate }) => {
  const filter = { isDeleted: false };
  if (type) filter.type = type;
  if (category) filter.category = new RegExp(category, 'i');
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }
  return filter;
};

const createRecord = async (data) => FinancialRecord.create(data);

const getRecords = async ({ page = 1, limit = 20, sortBy = 'date', order = 'desc', ...filters }) => {
  const filter = buildFilter(filters);
  const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
  const skip = (page - 1) * limit;
  const [records, total] = await Promise.all([
    FinancialRecord.find(filter).populate('user', 'name email role').sort(sort).skip(skip).limit(limit),
    FinancialRecord.countDocuments(filter),
  ]);
  return { records, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
};

const updateRecord = async (id, data) => {
  const record = await FinancialRecord.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true, runValidators: true });
  if (!record) throw new AppError('Record not found', 404);
  return record;
};

const softDeleteRecord = async (id) => {
  const record = await FinancialRecord.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
  if (!record) throw new AppError('Record not found', 404);
  return record;
};

module.exports = { createRecord, getRecords, updateRecord, softDeleteRecord };