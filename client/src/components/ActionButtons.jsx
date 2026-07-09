import { ArrowLeftIcon, HomeIcon, SparklesIcon, DocumentArrowDownIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ActionButtons() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.16 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex flex-wrap gap-3">
        <button type="button" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
          <SparklesIcon className="h-4 w-4" />
          Accept Better Basket
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          <UserGroupIcon className="h-4 w-4" />
          Save to Family Dashboard
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          <ChartBarIcon className="h-4 w-4" />
          View City Impact
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          <DocumentArrowDownIcon className="h-4 w-4" />
          Download Basket Report
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Results
        </button>
      </div>
    </motion.section>
  );
}
