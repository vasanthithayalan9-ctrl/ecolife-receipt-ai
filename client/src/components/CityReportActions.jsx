import { ArrowRightIcon, DocumentArrowDownIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

export default function CityReportActions({ onExport, onShare, onContinue }) {
  const { t } = useTranslation();

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onExport}
        className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
      >
        <DocumentArrowDownIcon className="h-5 w-5" />
        {t('cityReportActions.exportReport')}
      </button>
      <button
        type="button"
        onClick={onShare}
        className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-5 py-3 font-semibold text-emerald-100 transition hover:-translate-y-0.5"
      >
        <ShareIcon className="h-5 w-5" />
        {t('cityReportActions.sharePreview')}
      </button>
      <button
        type="button"
        onClick={onContinue}
        className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-5 py-3 font-semibold text-emerald-100 transition hover:-translate-y-0.5"
      >
        {t('cityReportActions.continueFamilyDashboard')}
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
