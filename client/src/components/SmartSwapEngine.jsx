import { motion } from 'framer-motion';

export default function SmartSwapEngine({ recommendations = [] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.06 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Smart Swap Engine</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Recommended swaps for a greener basket</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {recommendations.length > 0 ? (
          recommendations.map((swap, index) => (
            <div key={`${swap.from}-${index}`} className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-900/70 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-emerald-200/70">{swap.from}</p>
                  <p className="mt-1 text-lg font-semibold text-white">→ {swap.to}</p>
                </div>
                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">{swap.costNote}</div>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-emerald-100/80 sm:grid-cols-2">
                <p>CO2 saved: {swap.co2Saved} kg</p>
                <p>Health benefit: {swap.healthBenefit}</p>
                <p>Pollution reduction: {swap.pollutionBenefit}</p>
                <p>Reason: {swap.reason}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-900/70 p-5 text-sm text-emerald-100/80">No swap recommendations available.</div>
        )}
      </div>
    </motion.section>
  );
}
