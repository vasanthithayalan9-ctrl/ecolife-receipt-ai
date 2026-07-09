import { ArrowRightIcon, DocumentArrowDownIcon, ShareIcon } from '@heroicons/react/24/outline';

export default function CityReportActions() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button type="button" className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5">
        <DocumentArrowDownIcon className="h-5 w-5" />
        Export report
      </button>
      <button type="button" className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-5 py-3 font-semibold text-emerald-100 transition hover:-translate-y-0.5">
        <ShareIcon className="h-5 w-5" />
        Share preview
      </button>
      <button type="button" className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-5 py-3 font-semibold text-emerald-100 transition hover:-translate-y-0.5">
        Continue to family dashboard
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
