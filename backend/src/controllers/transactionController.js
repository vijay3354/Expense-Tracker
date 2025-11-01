const Transaction = require('../models/Transaction');
const { transactionSchema } = require('../validators/transactionValidator');

exports.createTransaction = async (req, res) => {
  const { error, value } = transactionSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const t = await Transaction.create(value);
  res.status(201).json(t);
};

exports.getTransactions = async (req, res) => {
  const { type, category, startDate, endDate, page = 1, limit = 50 } = req.query;
  const query = {};
  if (type) query.type = type;
  if (category) query.category = category;
  if (startDate || endDate) query.date = {};
  if (startDate) query.date.$gte = new Date(startDate);
  if (endDate) query.date.$lte = new Date(endDate);

  const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
  const items = await Transaction.find(query).sort({ date: -1 }).skip(skip).limit(parseInt(limit));
  const total = await Transaction.countDocuments(query);
  res.json({ items, total, page: Number(page), limit: Number(limit) });
};

exports.getTransaction = async (req, res) => {
  const t = await Transaction.findById(req.params.id);
  if (!t) return res.status(404).json({ message: 'Not found' });
  res.json(t);
};

exports.updateTransaction = async (req, res) => {
  const { error, value } = transactionSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const t = await Transaction.findByIdAndUpdate(req.params.id, value, { new: true });
  if (!t) return res.status(404).json({ message: 'Not found' });
  res.json(t);
};

exports.deleteTransaction = async (req, res) => {
  const t = await Transaction.findByIdAndDelete(req.params.id);
  if (!t) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};
