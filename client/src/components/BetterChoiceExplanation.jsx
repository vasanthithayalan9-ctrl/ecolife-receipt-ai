import { motion } from 'framer-motion';

const explanations = [
  {
    title: 'Plastic Bottle',
    harmful: 'Single-use plastic creates long-lived waste and adds to litter and microplastic pollution.',
    better: 'A steel bottle is reusable, durable, and cuts repeated packaging waste.',
    impact: 'If many people switch, city waste collection and landfill pressure can drop significantly.'
  },
  {
    title: 'Soft Drink',
    harmful: 'Sugary beverages contribute to poor health outcomes and excess packaging waste.',
    better: 'Fresh juice or water offers better nutrition and lower transport impact.',
    impact: 'Widespread adoption can improve public health and reduce sugary-drink demand.'
  },
  {
    title: 'Chicken',
    harmful: 'Meat production often carries a higher environmental burden and can be resource-intensive.',
    better: 'Lentils deliver protein with significantly lower emissions and less land use.',
    impact: 'A city-wide shift can reduce food system emissions and improve dietary patterns.'
  }
];

export default function BetterChoiceExplanation() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Better Choice Explanation</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Why these replacements make sense</h2>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {explanations.map((item) => (
          <div key={item.title} className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-900/70 p-5">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-emerald-100/70"><span className="font-semibold text-emerald-300">Why current is harmful:</span> {item.harmful}</p>
            <p className="mt-2 text-sm text-emerald-100/70"><span className="font-semibold text-emerald-300">Why alternative is better:</span> {item.better}</p>
            <p className="mt-2 text-sm text-emerald-100/70"><span className="font-semibold text-emerald-300">City impact:</span> {item.impact}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
