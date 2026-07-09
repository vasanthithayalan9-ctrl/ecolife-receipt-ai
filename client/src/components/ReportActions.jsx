import { ArrowDownTrayIcon, ShareIcon, PresentationChartLineIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ReportActions({
  onDownload = () => {},
  onShare = () => {},
  onSaveFamilyDashboard = () => {},
  onGoToBetterBasket = () => {},
  onAnalyzeAnotherReceipt = () => {}
}) {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.18 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onDownload} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
          <ArrowDownTrayIcon className="h-4 w-4" />
          {t('reportActions.downloadReport')}
        </button>
        <button type="button" onClick={onShare} className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          <ShareIcon className="h-4 w-4" />
          {t('reportActions.shareReport')}
        </button>
        <button type="button" onClick={onSaveFamilyDashboard} className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          <PresentationChartLineIcon className="h-4 w-4" />
          {t('reportActions.saveToFamilyDashboard')}
        </button>
        <button type="button" onClick={onGoToBetterBasket} className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          <ArrowPathRoundedSquareIcon className="h-4 w-4" />
          {t('reportActions.goToBetterBasket')}
        </button>
        <button type="button" onClick={onAnalyzeAnotherReceipt} className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          {t('reportActions.analyzeAnotherReceipt')}
        </button>
      </div>
    </motion.section>
  );
}
