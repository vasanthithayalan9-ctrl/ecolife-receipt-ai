import { motion } from 'framer-motion';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

export default function EcoVoiceCityNarrator() {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.16 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-gradient-to-r from-emerald-900/80 to-lime-900/70 p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-300">{t('voiceSummary.title')}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{t('ecoVoiceCityNarrator.heading')}</h3>
        </div>
        <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 text-emerald-50 transition hover:bg-emerald-500/20">
          <SpeakerWaveIcon className="h-5 w-5" />
          {t('ecoVoiceCityNarrator.playButton')}
        </button>
      </div>
    </motion.section>
  );
}
