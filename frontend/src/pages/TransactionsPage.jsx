import { useEffect, useState } from 'react';
import api from '../utils/api';
import TransactionTable from '../components/Transactions/TransactionTable';
import TransactionForm from '../components/Transactions/TransactionForm';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });
  const [page, setPage] = useState(1);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/transactions', {
        params: {
          startDate: filters.startDate,
          endDate: filters.endDate,
          page,
          limit: 10
        }
      });
      setTransactions(res.data.transactions);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters, page]);

  const handleSuccess = () => {
    setSuccessMsg('✅ Transaction added successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
    fetchTransactions();
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">Transactions</h1>

      {successMsg && (
        <div className="mb-6 bg-emerald-500/10 border border-emerald-500 text-emerald-400 px-6 py-4 rounded-3xl">
          {successMsg}
        </div>
      )}

      {/* Date Filter */}
      <div className="flex gap-4 mb-8">
        <input
          type="date"
          value={filters.startDate}
          onChange={e => setFilters({ ...filters, startDate: e.target.value })}
          className="bg-transparent border border-white/20 rounded-2xl px-5 py-3 focus:border-[#00F0FF]"
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={e => setFilters({ ...filters, endDate: e.target.value })}
          className="bg-transparent border border-white/20 rounded-2xl px-5 py-3 focus:border-[#00F0FF]"
        />
        <button
          onClick={() => { setPage(1); fetchTransactions(); }}
          className="bg-[#ffffff46] text-black px-8 rounded-2xl font-medium"
        >
          Filter
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading transactions...</div>
      ) : (
        <>
          <TransactionTable transactions={transactions} />

          {/* Simple Pagination */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-6 py-3 bg-white/10 text-black rounded-2xl disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-6 py-3">
              Page {pagination.page} of {pagination.pages || 1}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= (pagination.pages || 1)}
              className="px-6 py-3 bg-white/10 rounded-2xl disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </>
      )}

      <div className="mt-12">
        <TransactionForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default TransactionsPage;