import { useState } from 'react';
import api from '../../utils/api';

const TransactionForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ amount: '', type: 'expense', category: '', notes: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions', form);
      onSuccess();
      setForm({ amount: '', type: 'expense', category: '', notes: '' });
    } catch (err) {
      alert('Error creating transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
      <h3 className="font-semibold text-xl">Add New Transaction</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-black-200 mb-2">Amount (₹)</label>
          <input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required
                 className="w-full bg-transparent border  border-black/200 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm text-black-200 mb-2">Type</label>
          <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} 
                  className="w-full bg-transparent border  border-black/200 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-black-200 mb-2">Category</label>
        <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required
               className="w-full bg-transparent border border-black/200 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary" />
      </div>

      <div>
        <label className="block text-sm text-black-200 mb-2">Notes</label>
        <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                  className="w-full bg-transparent border border-black/200 rounded-3xl px-5 py-4 focus:outline-none focus:border-primary h-24" />
      </div>

      <button type="submit" className="w-full bg-primary text-black font-semibold py-5 rounded-3xl border border-black/200 hover:bg-black/30 transition-colors">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;