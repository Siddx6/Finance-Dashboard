const mongoose = require('mongoose');

const financialRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Transaction type is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      max_length: [50, 'Category cannot exceed 50 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      max_length: [500, 'Notes cannot exceed 500 characters'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

financialRecordSchema.index({ date: -1 });
financialRecordSchema.index({ type: 1 });
financialRecordSchema.index({ category: 1 });
financialRecordSchema.index({ isDeleted: 1 });
financialRecordSchema.index({ user: 1, date: -1 });

financialRecordSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeDeleted) {
    this.where({ isDeleted: false });
  }
  next();
});

module.exports = mongoose.model('FinancialRecord', financialRecordSchema);