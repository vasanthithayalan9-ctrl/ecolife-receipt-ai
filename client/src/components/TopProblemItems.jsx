import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function TopProblemItems() {
  const { t } = useTranslation();
  const items = [
    {
      name: t('topProblemItems.items.0.name'),
      problem: t('topProblemItems.items.0.problem'),
      replacement: t('topProblemItems.items.0.replacement'),
      impact: t('topProblemItems.items.0.impact')
    },
    {
      name: t('topProblemItems.items.1.name'),
      problem: t('topProblemItems.items.1.problem'),
      replacement: t('topProblemItems.items.1.replacement'),
      impact: t('topProblemItems.items.1.impact')
    },
    {
      name: t('topProblemItems.items.2.name'),
      problem: t('topProblemItems.items.2.problem'),
      replacement: t('topProblemItems.items.2.replacement'),
      impact: t('topProblemItems.items.2.impact')
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{t('topProblemItems.title')}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{t('topProblemItems.heading')}</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.name} className="rounded-[1.4rem] border border-emerald-700/40 bg-emerald-900/70 p-5">
            <p className="text-lg font-semibold text-white">{item.name}</p>
            <p className="mt-3 text-sm text-emerald-100/70">{t('topProblemItems.problemLabel')} {item.problem}</p>
            <p className="mt-2 text-sm text-emerald-100/70">{t('topProblemItems.replacementLabel')} {item.replacement}</p>
            <p className="mt-2 text-sm text-emerald-300">{t('topProblemItems.impactLabel')} {item.impact}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
