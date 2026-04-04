const Transaction = require('../models/Transaction');

const getDashboardSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });

    // Business logic - summary calculations
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpense;

    // Category wise breakdown
    const categoryMap = {};
    transactions.forEach(t => {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') categoryMap[t.category].income += t.amount;
      else categoryMap[t.category].expense += t.amount;
    });

    const categoryTotals = Object.keys(categoryMap).map(cat => ({
      category: cat,
      income: categoryMap[cat].income,
      expense: categoryMap[cat].expense,
      net: categoryMap[cat].income - categoryMap[cat].expense
    }));

    const recentActivity = transactions.slice(0, 5);

    // Monthly trends (simple grouping)
    const monthlyMap = {};
    transactions.forEach(t => {
      const monthKey = t.date.toISOString().slice(0, 7); // YYYY-MM
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { month: monthKey, income: 0, expense: 0 };
      }
      if (t.type === 'income') monthlyMap[monthKey].income += t.amount;
      else monthlyMap[monthKey].expense += t.amount;
    });

    const monthlyTrends = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryTotals,
      recentActivity,
      monthlyTrends,
      totalTransactions: transactions.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboardSummary };