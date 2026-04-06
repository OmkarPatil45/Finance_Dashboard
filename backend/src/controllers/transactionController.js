const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;

    let query = {};

    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name');

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const transaction = await Transaction.create({
      amount,
      type,
      category,
      date: date || new Date(),
      notes,
      createdBy: req.user.id
    });

    await transaction.populate('createdBy', 'name');
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTransactions, createTransaction, updateTransaction, deleteTransaction };