import { motion } from 'framer-motion';

export default function ImpactSummary({ summary = {} }) {
  const {
    totalCurrentCarbon = 0,
    totalBetterCarbon = 0,
    co2Saved = 0,
    carbonReduction = 0,
    healthImprovement = 0,
    plasticImprovement = 0,
    moneyLabel = '₹0 saved',
    treeEquivalent = 0
  } = summary;

  const stats = [
    { label: 'Total Current Carbon', value: `${totalCurrentCarbon.toFixed(1)} kg` },
    { label: 'Total Better Basket Carbon', value: `${totalBetterCarbon.toFixed(1)} kg` },
    { label: 'CO2 Saved', value: `${co2Saved.toFixed(1)} kg` },
    { label: 'Carbon Reduction %', value: `${carbonReduction}%` },
    { label: 'Health Score Improved', value: `${healthImprovement}%` },
    { label: 'Plastic Waste Reduced', value: `${plasticImprovement}%` },
    { label: 'Money Difference', value: moneyLabel },
    { label: 'Tree Equivalent', value: `${treeEquivalent} trees` }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 }}
      className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((item) => (
        <div key={item.label} className="rounded-[1.4rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950/90 to-emerald-900/80 p-5 shadow-[0_18px_60px_rgba(3,20,13,0.22)]">
          <p className="text-sm text-emerald-200/80">{item.label}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </motion.section>
  );
}
