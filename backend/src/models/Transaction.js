const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  category: { type: String, default: 'uncategorized' },
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
