const TransactionTable = ({ transactions }) => {
  return (
    <div className="glass rounded-3xl overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-white/10">
          <tr>
            <th className="text-left p-6 font-medium  border-black/200">Date</th>
            <th className="text-left p-6 font-medium  border-black/200">Category</th>
            <th className="text-left p-6 font-medium  border-black/200">Type</th>
            <th className="text-right p-6 font-medium  border-black/200">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id} className="border-b border-white/10 last:border-none hover:bg-white/5">
              <td className="p-6">{new Date(t.date).toLocaleDateString('en-IN')}</td>
              <td className="p-6">{t.category}</td>
              <td className="p-6">
                <span className={`px-3 py-1 rounded-full text-xs ${t.type === 'income' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>
                  {t.type}
                </span>
              </td>
              <td className={`p-6 text-right font-semibold ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                {t.type === 'income' ? '+' : '-'}₹{t.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;