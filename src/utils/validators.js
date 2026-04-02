const Joi = require('joi');

// ─── Auth ────────────────────────────────────────────────────────────────────

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('viewer', 'analyst', 'admin'),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

// ─── Users ───────────────────────────────────────────────────────────────────

const updateStatusSchema = Joi.object({
  status: Joi.string().valid('active', 'inactive').required(),
});

// ─── Financial Records ───────────────────────────────────────────────────────

const createRecordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().trim().max(50).required(),
  date: Joi.date().iso(),
  notes: Joi.string().trim().max(500).allow('', null),
  userId: Joi.string().hex().length(24),
});

const updateRecordSchema = Joi.object({
  amount: Joi.number().positive(),
  type: Joi.string().valid('income', 'expense'),
  category: Joi.string().trim().max(50),
  date: Joi.date().iso(),
  notes: Joi.string().trim().max(500).allow('', null),
}).min(1);

const recordQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  type: Joi.string().valid('income', 'expense'),
  category: Joi.string().trim(),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  sortBy: Joi.string().valid('date', 'amount', 'createdAt').default('date'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});

// ─── Validate helper ─────────────────────────────────────────────────────────

const validate = (schema, source = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[source], {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map((d) => d.message).join('; ');
    return res.status(400).json({ status: 'fail', message: messages });
  }

  req[source] = value;
  next();
};

// ─── Exports ─────────────────────────────────────────────────────────────────

module.exports = {
  registerSchema,
  loginSchema,
  updateStatusSchema,
  createRecordSchema,
  updateRecordSchema,
  recordQuerySchema,
  validate,
};