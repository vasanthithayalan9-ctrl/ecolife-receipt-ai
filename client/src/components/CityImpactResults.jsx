import { motion } from 'framer-motion';
import { ArrowTrendingUpIcon, CubeTransparentIcon, HeartIcon, SparklesIcon, FireIcon, SunIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const iconMap = {
  'Monthly CO2 Reduction': FireIcon,
  'Yearly CO2 Reduction': ArrowTrendingUpIcon,
  'Plastic Items Avoided': CubeTransparentIcon,
  'Healthier Product Choices': HeartIcon,
  'Community Green Score': SparklesIcon,
  'Tree Equivalent': SparklesIcon,
  'Air Quality Contribution': SunIcon,
  'Lifestyle Risk Reduction': ShieldCheckIcon
};

export default function CityImpactResults({ metrics = [] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 }}
      className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
    >
      {metrics.map((item) => {
        const Icon = iconMap[item.label] || SparklesIcon;
        return (
          <div key={item.label} className="rounded-[1.6rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950/90 to-emerald-900/80 p-5 shadow-[0_18px_60px_rgba(3,20,13,0.22)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-emerald-200/80">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </motion.section>
  );
}
