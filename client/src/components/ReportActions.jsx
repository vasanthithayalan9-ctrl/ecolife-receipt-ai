import { ArrowDownTrayIcon, ShareIcon, PresentationChartLineIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ReportActions() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.18 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex flex-wrap gap-3">
        <button type="button" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
          <ArrowDownTrayIcon className="h-4 w-4" />
          Download Report
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          <ShareIcon className="h-4 w-4" />
          Share Report
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          <PresentationChartLineIcon className="h-4 w-4" />
          Save to Family Dashboard
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          <ArrowPathRoundedSquareIcon className="h-4 w-4" />
          Go to Better Basket
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          Analyze Another Receipt
        </button>
      </div>
    </motion.section>
  );
}
