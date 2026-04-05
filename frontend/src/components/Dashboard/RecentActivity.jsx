const RecentActivity = ({ data }) => {
  return (
    <div className="glass rounded-3xl p-6 h-full">
      <h3 className="font-semibold text-lg mb-6">Recent Activity</h3>
      <div className="space-y-5">
        {data.map((t, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${t.type === 'income' ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <div>
                <p className="font-medium">{t.category}</p>
                <p className="text-xs text-black-200">{t.notes || 'No notes'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                {t.type === 'income' ? '+' : '-'}₹{t.amount}
              </p>
              <p className="text-xs text-black-200">
                {new Date(t.date).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;