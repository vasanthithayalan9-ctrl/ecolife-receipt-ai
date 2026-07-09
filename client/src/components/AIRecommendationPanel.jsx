import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

const recommendations = [
  'Replace plastic products with reusable or refillable options.',
  'Prefer local products to reduce transport emissions.',
  'Reduce sugary drinks and choose water or herbal tea.',
  'Choose reusable packaging whenever possible.',
  'Buy seasonal items for better freshness and lower impact.'
];

export default function AIRecommendationPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.14 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950/90 to-emerald-900/80 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300">
          <SparklesIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">AI Recommendations</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">EcoLife AI Recommendations</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((item) => (
          <div key={item} className="rounded-[1.3rem] border border-emerald-700/40 bg-emerald-950/70 p-4 text-sm text-emerald-100/80">
            {item}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
