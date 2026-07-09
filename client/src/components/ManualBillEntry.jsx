import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ManualBillEntry() {
  const { t } = useTranslation();
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-900/90 to-emerald-950/90 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.25)]"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300">
          <ClipboardDocumentListIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{t('manualBillEntry.title')}</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">{t('manualBillEntry.heading')}</h2>
        </div>
      </div>

      <form className="mt-6 space-y-4" aria-label="Manual bill entry form">
        <label className="sr-only" htmlFor="shop-name">{t('manualBillEntry.shopNameLabel')}</label>
        <input id="shop-name" className="w-full rounded-2xl border border-emerald-700/70 bg-emerald-950/70 px-4 py-3 text-emerald-50 outline-none transition focus:border-emerald-400" placeholder={t('manualBillEntry.shopNamePlaceholder')} />

        <label className="sr-only" htmlFor="item-name">{t('manualBillEntry.itemNameLabel')}</label>
        <input id="item-name" className="w-full rounded-2xl border border-emerald-700/70 bg-emerald-950/70 px-4 py-3 text-emerald-50 outline-none transition focus:border-emerald-400" placeholder={t('manualBillEntry.itemNamePlaceholder')} />

        <label className="sr-only" htmlFor="quantity">{t('manualBillEntry.quantityLabel')}</label>
        <input id="quantity" className="w-full rounded-2xl border border-emerald-700/70 bg-emerald-950/70 px-4 py-3 text-emerald-50 outline-none transition focus:border-emerald-400" placeholder={t('manualBillEntry.quantityPlaceholder')} />

        <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-3 font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300">
          {t('manualBillEntry.analyzeButton')}
        </button>
      </form>
    </motion.section>
  );
}
