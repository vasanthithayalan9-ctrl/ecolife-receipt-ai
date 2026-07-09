import { motion } from 'framer-motion';
import { ArrowTrendingUpIcon, HeartIcon, SparklesIcon, FireIcon, CubeTransparentIcon, CurrencyDollarIcon, BoltIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const metrics = [
  { label: 'Total CO2 Emission', value: '3.8 kg', icon: FireIcon, gradient: 'from-rose-500 to-orange-500', ring: 78, accent: 'text-rose-200' },
  { label: 'EcoLife Score', value: '82/100', icon: SparklesIcon, gradient: 'from-emerald-500 to-lime-500', ring: 82, accent: 'text-emerald-200' },
  { label: 'Health Score', value: '64/100', icon: HeartIcon, gradient: 'from-sky-500 to-cyan-500', ring: 64, accent: 'text-sky-200' },
  { label: 'Pollution Score', value: '71/100', icon: BoltIcon, gradient: 'from-violet-500 to-fuchsia-500', ring: 71, accent: 'text-violet-200' },
  { label: 'Plastic Waste Score', value: '39/100', icon: CubeTransparentIcon, gradient: 'from-amber-500 to-yellow-500', ring: 39, accent: 'text-amber-200' },
  { label: 'Tree Equivalent', value: '14 trees', icon: GlobeAltIcon, gradient: 'from-green-500 to-emerald-500', ring: 86, accent: 'text-green-200' },
  { label: 'Potential CO2 Saving', value: '1.2 kg', icon: ArrowTrendingUpIcon, gradient: 'from-teal-500 to-emerald-500', ring: 74, accent: 'text-teal-200' },
  { label: 'Money Saving Potential', value: '₹320', icon: CurrencyDollarIcon, gradient: 'from-indigo-500 to-blue-500', ring: 68, accent: 'text-indigo-200' }
];

function ProgressRing({ value, gradient }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-20 w-20">
      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth="10" fill="none" />
        <circle cx="50" cy="50" r={radius} stroke="url(#gradient)" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">{value}%</div>
    </div>
  );
}

export default function ImpactScoreCards() {
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <motion.article
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-[1.6rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950/90 to-emerald-900/80 p-5 shadow-[0_18px_60px_rgba(3,20,13,0.22)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-emerald-200/80">{metric.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
              </div>
              <div className={`rounded-2xl bg-gradient-to-br ${metric.gradient} p-3 ${metric.accent}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <ProgressRing value={metric.ring} gradient={metric.gradient} />
              <div className="text-sm text-emerald-100/70">
                <p>Live estimate</p>
                <p className="mt-1 text-emerald-300">Premium insight</p>
              </div>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
