import { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import SummaryCards from '../components/Dashboard/SummaryCards';
import RecentActivity from '../components/Dashboard/RecentActivity';
import MonthlyTrendChart from '../components/Dashboard/MonthlyTrendChart';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/summary')
      .then(res => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading premium dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">Good morning, {user?.name} 👋</h1>
      <SummaryCards summary={summary} />
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-8">
          <MonthlyTrendChart data={summary.monthlyTrends} />
        </div>
        <div className="col-span-4">
          <RecentActivity data={summary.recentActivity} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;