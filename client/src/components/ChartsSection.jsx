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

export default function ChartsSection({ analysis, beforeAfter }) {
  const fallbackCategoryData = {
    labels: ['Dairy', 'Packaging', 'Beverage', 'Produce', 'Snacks'],
    totals: [0.9, 1.2, 0.8, 0.6, 0.3]
  };

  const categoryData = analysis?.items?.length
    ? analysis.items.reduce((acc, item) => {
        const label = item.category || 'Unknown';
        acc.labels.add(label);
        acc.totals[label] = (acc.totals[label] || 0) + (item.carbonTotal || 0);
        return acc;
      }, { labels: new Set(), totals: {} })
    : null;

  const categoryLabels = categoryData ? Array.from(categoryData.labels) : fallbackCategoryData.labels;
  const categoryTotals = categoryData ? categoryLabels.map((label) => Number((categoryData.totals[label] || 0).toFixed(1))) : fallbackCategoryData.totals;

  const healthDistribution = analysis?.items?.length
    ? analysis.items.reduce(
        (acc, item) => {
          const score = Number(item.healthScore || 0);
          if (score >= 70) acc[0] += 1;
          else if (score >= 40) acc[1] += 1;
          else acc[2] += 1;
          return acc;
        },
        [0, 0, 0]
      )
    : [2, 3, 3];

  const pollutionDistribution = analysis?.items?.length
    ? analysis.items.reduce(
        (acc, item) => {
          const score = Number(item.pollutionScore || 0);
          if (score <= 40) acc[0] += 1;
          else if (score <= 70) acc[1] += 1;
          else acc[2] += 1;
          return acc;
        },
        [0, 0, 0]
      )
    : [1, 4, 3];

  const beforeAfterValues = beforeAfter ? [beforeAfter.currentCarbon || 0, beforeAfter.improvedCarbon || 0] : [3.8, 2.6];

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#d1fae5' }, grid: { color: 'rgba(255,255,255,0.08)' } },
      x: { ticks: { color: '#d1fae5' }, grid: { display: false } }
    }
  };

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
          <Bar data={{ labels: categoryLabels, datasets: [{ label: 'Carbon by Category', data: categoryTotals, backgroundColor: ['rgba(52,211,153,0.7)', 'rgba(16,185,129,0.7)', 'rgba(132,204,22,0.7)', 'rgba(34,197,94,0.7)', 'rgba(250,204,21,0.7)'] }] }} options={barOptions} />
        </div>
      </div>
      <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-6 shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
        <h3 className="text-xl font-semibold text-white">Health Risk Distribution</h3>
        <div className="mt-4 h-72">
          <Doughnut data={{ labels: ['Low', 'Medium', 'High'], datasets: [{ label: 'Health Risk Distribution', data: healthDistribution, backgroundColor: ['rgba(52,211,153,0.75)', 'rgba(250,204,21,0.75)', 'rgba(248,113,113,0.75)'] }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#d1fae5' } } } }} />
        </div>
      </div>
      <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-6 shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
        <h3 className="text-xl font-semibold text-white">Pollution Impact Distribution</h3>
        <div className="mt-4 h-72">
          <Radar data={{ labels: ['Low', 'Medium', 'High'], datasets: [{ label: 'Pollution', data: pollutionDistribution, backgroundColor: 'rgba(52,211,153,0.2)', borderColor: '#34d399', pointBackgroundColor: '#34d399' }] }} options={{ responsive: true, maintainAspectRatio: false, scales: { r: { grid: { color: 'rgba(255,255,255,0.12)' }, angleLines: { color: 'rgba(255,255,255,0.12)' }, pointLabels: { color: '#d1fae5' }, ticks: { display: false } } } }} />
        </div>
      </div>
      <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-6 shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
        <h3 className="text-xl font-semibold text-white">Before vs After Carbon Comparison</h3>
        <div className="mt-4 h-72">
          <Bar data={{ labels: ['Current', 'Improved'], datasets: [{ label: 'Carbon Comparison', data: beforeAfterValues, backgroundColor: ['rgba(248,113,113,0.7)', 'rgba(52,211,153,0.7)'] }] }} options={barOptions} />
        </div>
      </div>
    </motion.section>
  );
}
