import { motion } from 'framer-motion';

const swaps = [
  { from: 'Plastic Bottle', to: 'Steel Bottle', co2: '0.22 kg', health: 'Less microplastic exposure', pollution: '70% less', cost: '₹130 more', reason: 'Reusable and durable for daily use.' },
  { from: 'Soft Drink', to: 'Fresh Juice', co2: '0.32 kg', health: 'Lower sugar and more nutrients', pollution: '55% less', cost: '₹40 less', reason: 'Healthier ingredient profile and lower packaging impact.' },
  { from: 'Chicken', to: 'Lentils', co2: '0.56 kg', health: 'Lower saturated fat', pollution: '65% less', cost: '₹60 less', reason: 'Protein-rich and significantly lower footprint.' },
  { from: 'Chips', to: 'Roasted Nuts', co2: '0.24 kg', health: 'Better satiety and less sodium', pollution: '45% less', cost: '₹20 more', reason: 'Lower processed-food impact and better nutrition.' },
  { from: 'Imported Apple', to: 'Local Banana', co2: '0.18 kg', health: 'Rich in fiber and potassium', pollution: '50% less', cost: '₹90 less', reason: 'Shorter transport distance and better local sourcing.' },
  { from: 'Disposable Bag', to: 'Cloth Bag', co2: '0.11 kg', health: 'No toxins from single-use plastics', pollution: '80% less', cost: '₹20 more', reason: 'Reusable and city-friendly waste reduction.' }
];

export default function SmartSwapEngine() {
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
        {swaps.map((swap) => (
          <div key={swap.from} className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-900/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-emerald-200/70">{swap.from}</p>
                <p className="mt-1 text-lg font-semibold text-white">→ {swap.to}</p>
              </div>
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">{swap.cost}</div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-emerald-100/80 sm:grid-cols-2">
              <p>CO2 reduced: {swap.co2}</p>
              <p>Health benefit: {swap.health}</p>
              <p>Pollution reduced: {swap.pollution}</p>
              <p>Reason: {swap.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
