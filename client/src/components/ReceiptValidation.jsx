import React from 'react';

export default function ReceiptValidation({ warnings = null }) {
  // Default placeholder warnings if none provided
  const defaultWarnings = [
    { id: 'missing-qty', label: 'Missing Quantity', count: 2, color: 'bg-yellow-500 text-yellow-900' },
    { id: 'unknown', label: 'Unknown Product', count: 1, color: 'bg-orange-500 text-orange-900' },
    { id: 'duplicate', label: 'Duplicate Product', count: 3, color: 'bg-red-500 text-red-900' },
    { id: 'unreadable', label: 'Unreadable Product', count: 1, color: 'bg-slate-500 text-slate-50' }
  ];

  const list = warnings ?? defaultWarnings;

  return (
    <section className="mt-10 rounded-3xl bg-emerald-950/60 p-6 ring-1 ring-emerald-700/30">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-emerald-300">SECTION 7</div>
          <h3 className="mt-1 text-2xl font-semibold text-emerald-50">Receipt Validation</h3>
          <p className="mt-1 text-sm text-emerald-200/70">Before analysis verify</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {list.map((w) => (
          <div key={w.id} className="flex items-center gap-4 rounded-2xl border border-emerald-700/20 bg-emerald-900/30 p-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${w.color} font-semibold`}>{w.count}</div>
            <div>
              <div className="text-sm font-medium text-emerald-100">{w.label}</div>
              <div className="mt-1 text-xs text-emerald-200/70">Show warnings using colored badges.</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
