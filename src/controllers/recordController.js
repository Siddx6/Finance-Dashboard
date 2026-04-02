const recordService = require('../services/recordService');
const { sendSuccess } = require('../utils/response');

const createRecord = async (req, res, next) => {
  try {
    const data = { ...req.body, user: req.body.user || req.user._id };
    const record = await recordService.createRecord(data);
    sendSuccess(res, 201, 'Record created successfully', { record });
  } catch (err) { next(err); }
};

const getRecords = async (req, res, next) => {
  try {
    const result = await recordService.getRecords(req.query);
    sendSuccess(res, 200, 'Records retrieved successfully', result);
  } catch (err) { next(err); }
};

const updateRecord = async (req, res, next) => {
  try {
    const record = await recordService.updateRecord(req.params.id, req.body);
    sendSuccess(res, 200, 'Record updated successfully', { record });
  } catch (err) { next(err); }
};

const deleteRecord = async (req, res, next) => {
  try {
    await recordService.softDeleteRecord(req.params.id);
    sendSuccess(res, 200, 'Record deleted successfully');
  } catch (err) { next(err); }
};

module.exports = { createRecord, getRecords, updateRecord, deleteRecord };