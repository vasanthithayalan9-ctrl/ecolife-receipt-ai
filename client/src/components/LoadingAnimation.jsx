import { motion, AnimatePresence } from 'framer-motion';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const steps = [
  'Analyzing Carbon...',
  'Classifying Products...',
  'Finding Better Alternatives...',
  'Generating Eco Score...'
];

export default function LoadingAnimation({ active = false, stepIndex = 0 }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/80 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.25)]"
        >
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-4 border-emerald-400/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-t-4 border-emerald-400"
              />
              <div className="absolute h-12 w-12 rounded-full bg-emerald-500/20" />
              <GlobeAltIcon className="h-10 w-10 text-emerald-300" />
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex h-3 w-3 animate-bounce rounded-full bg-emerald-400 [animation-delay:0ms]" />
              <span className="inline-flex h-3 w-3 animate-bounce rounded-full bg-lime-400 [animation-delay:160ms]" />
              <span className="inline-flex h-3 w-3 animate-bounce rounded-full bg-emerald-300 [animation-delay:320ms]" />
            </div>

            <div>
              <p className="text-lg font-semibold text-emerald-50">While analyzing</p>
              <p className="mt-2 text-sm text-emerald-200/80">{steps[stepIndex] ?? steps[0]}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
