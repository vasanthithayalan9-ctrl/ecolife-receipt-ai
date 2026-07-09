import { motion } from 'framer-motion';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';

export default function EcoVoiceCityNarrator() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.16 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-gradient-to-r from-emerald-900/80 to-lime-900/70 p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-300">EcoVoice summary</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">“Your city could cut waste faster when families switch to healthier, lower-impact products.”</h3>
        </div>
        <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 text-emerald-50 transition hover:bg-emerald-500/20">
          <SpeakerWaveIcon className="h-5 w-5" />
          Play summary
        </button>
      </div>
    </motion.section>
  );
}
