import { motion } from 'framer-motion';

const items = [
  {
    name: 'Plastic Bottle',
    problem: 'High plastic waste and frequent single-use packaging.',
    replacement: 'Reusable bottle',
    impact: 'Cuts waste by 80% and lowers carbon footprint.'
  },
  {
    name: 'Soft Drink',
    problem: 'High sugar content and elevated transport footprint.',
    replacement: 'Sparkling water or local tea',
    impact: 'Improves health score and reduces emissions.'
  },
  {
    name: 'Imported Apple',
    problem: 'Long-distance transport adds avoidable emissions.',
    replacement: 'Local apple',
    impact: 'Reduces transport emissions significantly.'
  }
];

export default function TopProblemItems() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Top Problems</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Top 3 harmful products from the receipt</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.name} className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-900/70 p-5">
            <p className="text-lg font-semibold text-white">{item.name}</p>
            <p className="mt-3 text-sm text-emerald-100/70">Problem created: {item.problem}</p>
            <p className="mt-2 text-sm text-emerald-100/70">Suggested replacement: {item.replacement}</p>
            <p className="mt-2 text-sm text-emerald-300">Impact after replacement: {item.impact}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
