import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ReceiptSummary() {
  const { t } = useTranslation();
  const [data, setData] = useState({ receipts: 0 });

  useEffect(() => {
    let mounted = true;
    fetch('/api/analytics/summary')
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        setData({ receipts: json.summary?.receipts ?? 0 });
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const stats = [
    { id: 'total', label: t('receiptSummary.stats.totalProducts'), value: data.receipts, color: 'from-emerald-500 to-emerald-600' },
    { id: 'high-carbon', label: t('receiptSummary.stats.highCarbonProducts'), value: 0, color: 'from-red-500 to-red-600' },
    { id: 'healthy', label: t('receiptSummary.stats.healthyProducts'), value: 0, color: 'from-lime-400 to-lime-500' },
    { id: 'plastic', label: t('receiptSummary.stats.plasticProducts'), value: 0, color: 'from-sky-400 to-sky-500' },
    { id: 'organic', label: t('receiptSummary.stats.organicProducts'), value: 0, color: 'from-emerald-300 to-emerald-400' },
    { id: 'imported', label: t('receiptSummary.stats.importedProducts'), value: 0, color: 'from-violet-400 to-violet-500' },
    { id: 'local', label: t('receiptSummary.stats.localProducts'), value: 0, color: 'from-yellow-400 to-yellow-500' }
  ];

  return (
    <section className="mt-10 rounded-3xl bg-emerald-950/60 p-6 ring-1 ring-emerald-700/30">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-emerald-300">{t('receiptSummary.sectionLabel')}</div>
          <h3 className="mt-1 text-2xl font-semibold text-emerald-50">{t('receiptSummary.heading')}</h3>
          <p className="mt-1 text-sm text-emerald-200/70">{t('receiptSummary.description')}</p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <button className="rounded-full bg-emerald-700/20 px-3 py-2 text-sm text-emerald-200">{t('receiptSummary.showButton')}</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.id} className="relative overflow-hidden rounded-2xl border border-emerald-700/20 bg-gradient-to-br from-emerald-900/40 to-emerald-900/20 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-emerald-200/90">{s.label}</div>
                <div className="mt-2 text-3xl font-bold text-emerald-50">{s.value}</div>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${s.color} text-white/90`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-95">
                  <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="mt-3 h-2 w-full rounded-full bg-emerald-800/30">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(100, s.value * 10)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
