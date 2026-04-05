import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const SummaryCards = ({ summary }) => {
  const cards = [
    {
      title: "Total Income",
      value: `₹${summary.totalIncome.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-400"
    },
    {
      title: "Total Expense",
      value: `₹${summary.totalExpense.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-red-400"
    },
    {
      title: "Net Balance",
      value: `₹${summary.netBalance.toLocaleString()}`,
      icon: DollarSign,
      color: summary.netBalance >= 0 ? "text-primary" : "text-red-400"
    },
    {
      title: "Transactions",
      value: summary.totalTransactions,
      icon: Activity,
      color: "text-primary"
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="glass rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-black-200 text-sm">{card.title}</p>
              <p className="text-3xl font-semibold mt-2">{card.value}</p>
            </div>
            <card.icon className={`w-10 h-10 ${card.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;