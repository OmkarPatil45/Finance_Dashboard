import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const MonthlyTrendChart = ({ data }) => {
  const chartData = {
    labels: data.map(m => m.month),
    datasets: [
      {
        label: 'Income',
        data: data.map(m => m.income),
        borderColor: '#00F0FF',
        tension: 0.4,
      },
      {
        label: 'Expense',
        data: data.map(m => m.expense),
        borderColor: '#FF3B5C',
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="font-semibold text-lg mb-6">Monthly Trends</h3>
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default MonthlyTrendChart;