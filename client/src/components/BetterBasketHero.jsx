import { SparklesIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function BetterBasketHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950 via-emerald-900/90 to-emerald-950/80 p-8 shadow-[0_25px_90px_rgba(3,20,13,0.35)]"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-200">
            <SparklesIcon className="h-4 w-4" />
            Better Basket Generator
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Build a Better Basket</h1>
          <p className="mt-4 text-lg text-emerald-100/75">
            See how small shopping changes can reduce carbon, improve health, and protect your city.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-100/80">
          <div className="flex items-center gap-3">
            <GlobeAltIcon className="h-8 w-8 text-emerald-300" />
            <div>
              <p className="text-sm text-emerald-200/80">EcoLife AI</p>
              <p className="text-xl font-semibold text-white">Smarter swaps</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
