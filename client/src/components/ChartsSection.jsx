import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement);

const carbonData = {
  labels: ['Dairy', 'Packaging', 'Beverage', 'Produce', 'Snacks'],
  datasets: [{
    label: 'Carbon by Category',
    data: [0.9, 1.2, 0.8, 0.6, 0.3],
    backgroundColor: ['rgba(52,211,153,0.7)', 'rgba(16,185,129,0.7)', 'rgba(132,204,22,0.7)', 'rgba(34,197,94,0.7)', 'rgba(250,204,21,0.7)']
  }]
};

const healthData = {
  labels: ['Low', 'Medium', 'High'],
  datasets: [{
    label: 'Health Risk Distribution',
    data: [2, 3, 3],
    backgroundColor: ['rgba(52,211,153,0.75)', 'rgba(250,204,21,0.75)', 'rgba(248,113,113,0.75)']
  }]
};

const pollutionData = {
  labels: ['Low', 'Medium', 'High'],
  datasets: [{
    label: 'Pollution Impact Distribution',
    data: [1, 4, 3],
    backgroundColor: ['rgba(52,211,153,0.75)', 'rgba(250,204,21,0.75)', 'rgba(248,113,113,0.75)']
  }]
};

const beforeAfterData = {
  labels: ['Current', 'Improved'],
  datasets: [{
    label: 'Carbon Comparison',
    data: [3.8, 2.6],
    backgroundColor: ['rgba(248,113,113,0.7)', 'rgba(52,211,153,0.7)']
  }]
};

export default function ChartsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="mt-8 grid gap-6 xl:grid-cols-2"
    >
      <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-6 shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
        <h3 className="text-xl font-semibold text-white">Carbon by Category</h3>
        <div className="mt-4 h-72">
          <Bar data={carbonData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: '#d1fae5' }, grid: { color: 'rgba(255,255,255,0.08)' } }, x: { ticks: { color: '#d1fae5' }, grid: { display: false } } } }} />
        </div>
      </div>
      <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-6 shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
        <h3 className="text-xl font-semibold text-white">Health Risk Distribution</h3>
        <div className="mt-4 h-72">
          <Doughnut data={healthData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#d1fae5' } } } }} />
        </div>
      </div>
      <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-6 shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
        <h3 className="text-xl font-semibold text-white">Pollution Impact Distribution</h3>
        <div className="mt-4 h-72">
          <Radar data={{ labels: ['Packaging','Beverage','Food','Transport','Waste'], datasets: [{ label: 'Pollution', data: [8, 7, 5, 4, 6], backgroundColor: 'rgba(52,211,153,0.2)', borderColor: '#34d399', pointBackgroundColor: '#34d399' }] }} options={{ responsive: true, maintainAspectRatio: false, scales: { r: { grid: { color: 'rgba(255,255,255,0.12)' }, angleLines: { color: 'rgba(255,255,255,0.12)' }, pointLabels: { color: '#d1fae5' }, ticks: { display: false } } } }} />
        </div>
      </div>
      <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-6 shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
        <h3 className="text-xl font-semibold text-white">Before vs After Carbon Comparison</h3>
        <div className="mt-4 h-72">
          <Bar data={beforeAfterData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: '#d1fae5' }, grid: { color: 'rgba(255,255,255,0.08)' } }, x: { ticks: { color: '#d1fae5' }, grid: { display: false } } } }} />
        </div>
      </div>
    </motion.section>
  );
}
