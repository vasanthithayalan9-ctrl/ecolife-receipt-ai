import { motion } from 'framer-motion';

export default function CityBeforeAfterSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
    >
      <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/75 p-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">Current city pattern</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Baseline consumption is still heavy</h3>
        <ul className="mt-5 space-y-3 text-emerald-100/80">
          <li>• Disposable packaging remains common in daily shopping.</li>
          <li>• Processed food choices lead to higher waste and lower nutrition.</li>
          <li>• Household plastic output is steady and highly visible.</li>
        </ul>
      </div>

      <div className="rounded-[2rem] border border-emerald-600/40 bg-gradient-to-br from-emerald-900/90 to-lime-900/80 p-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-lime-300">Future city scenario</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">A greener habit shift could transform neighborhoods</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-sm text-emerald-100/70">Waste</p>
            <p className="mt-2 text-2xl font-semibold text-white">-37%</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-sm text-emerald-100/70">Carbon</p>
            <p className="mt-2 text-2xl font-semibold text-white">-29%</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-sm text-emerald-100/70">Health</p>
            <p className="mt-2 text-2xl font-semibold text-white">+18%</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
