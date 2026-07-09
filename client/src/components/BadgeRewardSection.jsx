import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const badges = [
  { title: 'Plastic Saver', description: 'You cut single-use plastic dramatically.' },
  { title: 'Low Carbon Shopper', description: 'Your basket lowers emissions and waste.' },
  { title: 'Healthy Choice Maker', description: 'Your food swaps improve nutrition quality.' },
  { title: 'City Green Contributor', description: 'Your choices support a cleaner city.' }
];

export default function BadgeRewardSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.18 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950/90 to-emerald-900/80 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Badge Rewards</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Celebrate your better basket</h2>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {badges.map((badge) => (
          <div key={badge.title} className="rounded-[1.3rem] border border-emerald-700/40 bg-emerald-950/70 p-5">
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircleIcon className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">{badge.title}</h3>
            </div>
            <p className="mt-3 text-sm text-emerald-100/70">{badge.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
