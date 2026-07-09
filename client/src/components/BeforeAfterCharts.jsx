import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ChartCard({ title, data, options }) {
  return (
    <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-6 shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <div className="mt-4 h-72">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default function BeforeAfterCharts({ currentCarbon = 0, betterCarbon = 0, healthChange = 0, pollutionChange = 0 }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#d1fae5' } } },
    scales: { y: { beginAtZero: true, ticks: { color: '#d1fae5' }, grid: { color: 'rgba(255,255,255,0.08)' } }, x: { ticks: { color: '#d1fae5' }, grid: { display: false } } }
  };

  const carbonData = {
    labels: ['Current', 'Better Basket'],
    datasets: [{ label: 'Carbon', data: [currentCarbon, betterCarbon], backgroundColor: ['rgba(248,113,113,0.7)', 'rgba(52,211,153,0.7)'] }]
  };

  const healthData = {
    labels: ['Current', 'Better Basket'],
    datasets: [{ label: 'Health Score', data: [Math.max(0, 100 - healthChange), Math.max(0, 100 + healthChange)], backgroundColor: ['rgba(96,165,250,0.7)', 'rgba(52,211,153,0.7)'] }]
  };

  const pollutionData = {
    labels: ['Current', 'Better Basket'],
    datasets: [{ label: 'Pollution', data: [Math.max(0, 100 - pollutionChange), Math.max(0, 100 - pollutionChange / 2)], backgroundColor: ['rgba(250,204,21,0.7)', 'rgba(16,185,129,0.7)'] }]
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="mt-8 grid gap-6 xl:grid-cols-3"
    >
      <ChartCard title="Before vs After Carbon" data={carbonData} options={options} />
      <ChartCard title="Before vs After Health Score" data={healthData} options={options} />
      <ChartCard title="Before vs After Pollution" data={pollutionData} options={options} />
    </motion.section>
  );
}
