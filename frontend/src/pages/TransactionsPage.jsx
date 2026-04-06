import { useEffect, useState } from 'react';
import api from '../utils/api';
import TransactionTable from '../components/Transactions/TransactionTable';
import TransactionForm from '../components/Transactions/TransactionForm';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await api.get('/transactions');
    setTransactions(res.data);
  };  

  useEffect(() => { fetchTransactions(); }, []);

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">Transactions</h1>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-7">
          <TransactionTable transactions={transactions} />
        </div>
        <div className="col-span-5">
          <TransactionForm onSuccess={fetchTransactions} />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;