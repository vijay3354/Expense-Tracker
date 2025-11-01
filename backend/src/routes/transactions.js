const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/transactionController');

router.get('/', ctrl.getTransactions);
router.get('/:id', ctrl.getTransaction);
router.post('/', ctrl.createTransaction);
router.put('/:id', ctrl.updateTransaction);
router.delete('/:id', ctrl.deleteTransaction);

module.exports = router;
