import { motion } from 'framer-motion';

export default function SimulatorInputPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-emerald-200/80">City Name</label>
            <input defaultValue="Chennai" className="w-full rounded-2xl border border-emerald-700/70 bg-emerald-900/70 px-4 py-3 text-emerald-50 outline-none focus:border-emerald-400" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-emerald-200/80">Number of People</label>
              <input defaultValue="10000" className="w-full rounded-2xl border border-emerald-700/70 bg-emerald-900/70 px-4 py-3 text-emerald-50 outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-emerald-200/80">Receipts per Person per Month</label>
              <input defaultValue="4" className="w-full rounded-2xl border border-emerald-700/70 bg-emerald-900/70 px-4 py-3 text-emerald-50 outline-none focus:border-emerald-400" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-emerald-200/80">Average CO2 Saved per Receipt</label>
              <input defaultValue="2.5" className="w-full rounded-2xl border border-emerald-700/70 bg-emerald-900/70 px-4 py-3 text-emerald-50 outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-emerald-200/80">Average Plastic Items Avoided</label>
              <input defaultValue="3" className="w-full rounded-2xl border border-emerald-700/70 bg-emerald-900/70 px-4 py-3 text-emerald-50 outline-none focus:border-emerald-400" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-emerald-200/80">Average Health Score Improvement</label>
            <input defaultValue="18" className="w-full rounded-2xl border border-emerald-700/70 bg-emerald-900/70 px-4 py-3 text-emerald-50 outline-none focus:border-emerald-400" />
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-900/80 to-emerald-950/80 p-6">
          <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-200">Live demo simulation</div>
          <h2 className="mt-4 text-2xl font-semibold text-white">Calculate City Impact</h2>
          <p className="mt-3 text-sm text-emerald-100/70">Use the default sample values to preview how a city-scale shift can create measurable change in emissions, plastic waste, and healthier consumption.</p>
          <button type="button" className="mt-6 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5">Calculate City Impact</button>
        </div>
      </div>
    </motion.section>
  );
}
