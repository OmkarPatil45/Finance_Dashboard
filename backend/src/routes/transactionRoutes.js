const express = require('express');
const { 
  getTransactions, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction 
} = require('../controllers/transactionController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.use(authMiddleware);

// Analyst + Admin → can view transactions
router.get('/', roleMiddleware(['analyst', 'admin']), getTransactions);

// Only Admin → create/update/delete
const transactionValidation = [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('category').trim().notEmpty().withMessage('Category is required')
];

router.post('/', 
  roleMiddleware(['admin']),
  transactionValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createTransaction
);

router.put('/:id', roleMiddleware(['admin']), updateTransaction);
router.delete('/:id', roleMiddleware(['admin']), deleteTransaction);

module.exports = router;