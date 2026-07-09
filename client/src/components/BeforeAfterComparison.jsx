import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function BeforeAfterComparison() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950/90 to-emerald-900/80 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Before vs After</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Current Basket vs Better Basket</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
          <ArrowRightIcon className="h-4 w-4" />
          Smart swaps reduce impact fast
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-950/70 p-6">
          <p className="text-sm text-emerald-200/80">Current Carbon</p>
          <p className="mt-3 text-3xl font-semibold text-white">3.8 kg CO2</p>
        </div>
        <div className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-950/70 p-6">
          <p className="text-sm text-emerald-200/80">Improved Carbon</p>
          <p className="mt-3 text-3xl font-semibold text-white">2.6 kg CO2</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.3rem] border border-emerald-700/40 bg-emerald-950/70 p-5">
          <p className="text-sm text-emerald-200/70">Carbon Reduced %</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">31%</p>
        </div>
        <div className="rounded-[1.3rem] border border-emerald-700/40 bg-emerald-950/70 p-5">
          <p className="text-sm text-emerald-200/70">Health Score Improved %</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">+18%</p>
        </div>
        <div className="rounded-[1.3rem] border border-emerald-700/40 bg-emerald-950/70 p-5">
          <p className="text-sm text-emerald-200/70">Plastic Waste Reduced %</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">42%</p>
        </div>
      </div>
    </motion.section>
  );
}
