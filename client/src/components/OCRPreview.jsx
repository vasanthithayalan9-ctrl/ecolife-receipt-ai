import { EyeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function OCRPreview({ items = [] }) {
  const { t } = useTranslation();
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300">
          <EyeIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{t('ocrPreview.title')}</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">{t('ocrPreview.heading')}</h2>
        </div>
      </div>

      <div className="mt-6 rounded-[1.4rem] border border-emerald-700/40 bg-emerald-900/70 p-5">
        <div className="flex flex-wrap gap-2">
          {items.length > 0 ? items.map((item) => (
            <span key={item} className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100/85">
              {item}
            </span>
          )) : (
            <span className="text-sm text-emerald-100/70">{t('ocrPreview.noItemsDetected')}</span>
          )}
        </div>
      </div>
    </motion.section>
  );
}
