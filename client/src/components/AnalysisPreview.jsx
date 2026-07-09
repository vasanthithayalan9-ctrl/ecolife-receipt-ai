import { ChartBarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function AnalysisPreview() {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-900/90 to-emerald-950/90 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300">
          <ChartBarIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{t('analysisPreview.title')}</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">{t('analysisPreview.heading')}</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-950/70 p-5">
          <p className="text-sm text-emerald-200/70">{t('analysisPreview.overallEcoScore')}</p>
          <p className="mt-2 text-4xl font-semibold text-emerald-300">82/100</p>
        </div>
        <div className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-950/70 p-5">
          <p className="text-sm text-emerald-200/70">{t('analysisPreview.suggestedAlternatives')}</p>
          <ul className="mt-3 space-y-2 text-sm text-emerald-100/80">
            <li>• {t('analysisPreview.swapPlasticBottle')}</li>
            <li>• {t('analysisPreview.chooseLocalProduce')}</li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
