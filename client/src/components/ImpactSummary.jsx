import { motion } from 'framer-motion';

const summary = [
  { label: 'Total Current Carbon', value: '3.8 kg' },
  { label: 'Total Better Basket Carbon', value: '2.6 kg' },
  { label: 'CO2 Saved', value: '1.2 kg' },
  { label: 'Carbon Reduction %', value: '31%' },
  { label: 'Health Score Improved', value: '+18%' },
  { label: 'Plastic Waste Reduced', value: '42%' },
  { label: 'Money Difference', value: '₹80 saved' },
  { label: 'Tree Equivalent', value: '14 trees' }
];

export default function ImpactSummary() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 }}
      className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
    >
      {summary.map((item) => (
        <div key={item.label} className="rounded-[1.4rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950/90 to-emerald-900/80 p-5 shadow-[0_18px_60px_rgba(3,20,13,0.22)]">
          <p className="text-sm text-emerald-200/80">{item.label}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </motion.section>
  );
}
