import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const actions = [
  'Launch a resident swap challenge every month.',
  'Reward top-performing local markets and stores.',
  'Promote reusable packaging through community kiosks.',
  'Publish a neighborhood scorecard with weekly progress.'
];

export default function CityActionPlan() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.14 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/75 p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">Next step</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">A practical rollout plan for city leaders</h3>
          <p className="mt-3 text-emerald-100/70">These actions help turn a simulated transformation into an experience that can be funded, measured, and scaled.</p>
        </div>
        <div className="w-full max-w-md rounded-[1.5rem] border border-emerald-600/40 bg-gradient-to-br from-emerald-900/80 to-emerald-950/80 p-6">
          {actions.map((action) => (
            <div key={action} className="mb-3 flex items-center gap-3 rounded-2xl border border-emerald-700/40 bg-emerald-950/70 px-4 py-3 text-emerald-50">
              <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
