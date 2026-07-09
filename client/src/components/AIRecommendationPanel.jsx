import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

export default function AIRecommendationPanel({ recommendations = [] }) {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.14 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950/90 to-emerald-900/80 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300">
          <SparklesIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{t('recommendationPanel.title')}</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">{t('recommendationPanel.heading')}</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {recommendations.length > 0 ? (
          recommendations.map((recommendation, index) => (
            <div key={`${recommendation.currentProduct}-${index}`} className="rounded-[1.3rem] border border-emerald-700/40 bg-emerald-950/70 p-5 text-sm text-emerald-100/80">
              <p className="text-sm text-emerald-200/80">Current Product</p>
              <p className="mt-1 font-semibold text-white">{recommendation.currentProduct}</p>
              <p className="mt-3 text-sm text-emerald-200/80">Alternative Product</p>
              <p className="mt-1 font-semibold text-white">{recommendation.alternativeProduct}</p>
              <p className="mt-3 text-sm text-emerald-200/80">Reason</p>
              <p className="mt-1 text-sm text-emerald-100/80">{recommendation.reason}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl bg-emerald-950/80 p-3 text-xs uppercase tracking-[0.18em] text-emerald-300">Carbon Saved</div>
                <div className="rounded-2xl bg-emerald-950/80 p-3 text-xs uppercase tracking-[0.18em] text-emerald-300">Health Benefit</div>
                <div className="rounded-2xl bg-emerald-950/80 p-3 text-sm text-white">{recommendation.carbonSaved} kg</div>
                <div className="rounded-2xl bg-emerald-950/80 p-3 text-sm text-white">{recommendation.healthBenefit}</div>
                <div className="rounded-2xl bg-emerald-950/80 p-3 text-xs uppercase tracking-[0.18em] text-emerald-300">Pollution Benefit</div>
                <div className="rounded-2xl bg-emerald-950/80 p-3 text-xs uppercase tracking-[0.18em] text-emerald-300">Cost Note</div>
                <div className="rounded-2xl bg-emerald-950/80 p-3 text-sm text-white">{recommendation.pollutionBenefit}</div>
                <div className="rounded-2xl bg-emerald-950/80 p-3 text-sm text-white">{recommendation.costNote}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[1.3rem] border border-emerald-700/40 bg-emerald-950/70 p-6 text-sm text-emerald-100/80">
            No recommendations available yet.
          </div>
        )}
      </div>
    </motion.section>
  );
}
