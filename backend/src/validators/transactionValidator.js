const Joi = require('joi');

const transactionSchema = Joi.object({
  type: Joi.string().valid('income', 'expense').required(),
  amount: Joi.number().precision(2).positive().required(),
  description: Joi.string().allow('', null),
  category: Joi.string().max(100).allow('', null),
  date: Joi.date().required(),
});

module.exports = { transactionSchema };
