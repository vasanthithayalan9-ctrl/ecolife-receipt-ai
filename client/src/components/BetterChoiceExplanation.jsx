import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const explanationKeys = ['plasticBottle', 'softDrink', 'chicken'];

export default function BetterChoiceExplanation() {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{t('betterChoiceExplanation.title')}</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{t('betterChoiceExplanation.heading')}</h2>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {explanationKeys.map((key) => (
          <div key={key} className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-900/70 p-5">
            <h3 className="text-lg font-semibold text-white">{t(`betterChoiceExplanation.${key}.title`)}</h3>
            <p className="mt-3 text-sm text-emerald-100/70">
              <span className="font-semibold text-emerald-300">{t('betterChoiceExplanation.whyCurrentIsHarmful')}</span> {t(`betterChoiceExplanation.${key}.harmful`)}
            </p>
            <p className="mt-2 text-sm text-emerald-100/70">
              <span className="font-semibold text-emerald-300">{t('betterChoiceExplanation.whyAlternativeIsBetter')}</span> {t(`betterChoiceExplanation.${key}.better`)}
            </p>
            <p className="mt-2 text-sm text-emerald-100/70">
              <span className="font-semibold text-emerald-300">{t('betterChoiceExplanation.cityImpact')}</span> {t(`betterChoiceExplanation.${key}.impact`)}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
