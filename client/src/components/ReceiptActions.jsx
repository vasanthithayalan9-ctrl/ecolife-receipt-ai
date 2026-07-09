import React, { useEffect, useState } from 'react';

const loadingSteps = [
  'Analyzing Carbon...',
  'Classifying Products...',
  'Finding Better Alternatives...',
  'Generating Eco Score...'
];

export default function ReceiptActions({ onReset } ) {
  const [analyzing, setAnalyzing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!analyzing) return;

    const timer = window.setInterval(() => {
      setStepIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 1200);

    return () => window.clearInterval(timer);
  }, [analyzing]);

  async function handleAnalyze() {
    setAnalyzing(true);
    setStepIndex(0);
    try {
      await fetch('/api/analytics/summary');
      // future: navigate to results or show analysis
    } catch (e) {
      // ignore network errors for now
    } finally {
      window.setTimeout(() => setAnalyzing(false), 2200);
    }
  }

  function handleReset() {
    if (onReset) onReset();
    setSaved(false);
  }

  function handleSaveDraft() {
    // Save a minimal draft marker to localStorage
    const draft = { timestamp: Date.now(), note: 'receipt-draft' };
    try {
      localStorage.setItem('receiptDraft', JSON.stringify(draft));
      setSaved(true);
    } catch (e) {
      // localStorage not available
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          onClick={handleReset}
          className="rounded-xl border border-emerald-700/40 bg-emerald-900/40 px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-900/60"
        >
          Reset
        </button>

        <button
          onClick={handleSaveDraft}
          className={`rounded-xl border border-emerald-700/40 bg-emerald-700/10 px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-700/20 ${saved ? 'ring-2 ring-emerald-400/40' : ''}`}
        >
          {saved ? 'Draft saved' : 'Save Draft'}
        </button>

        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className={`rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white ${analyzing ? 'opacity-70' : 'hover:brightness-95'}`}
        >
          {analyzing ? 'Analyzing…' : 'Analyze Receipt'}
        </button>
      </div>

      {analyzing && (
        <div className="rounded-3xl border border-emerald-700/50 bg-emerald-950/70 p-6 shadow-lg shadow-emerald-950/40">
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400/20" />
              <div className="absolute inset-0 rounded-full border-t-4 border-emerald-400 animate-spin" />
              <div className="absolute h-12 w-12 rounded-full bg-emerald-500/20" />
              <div className="text-3xl">🌍</div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex h-3 w-3 animate-bounce rounded-full bg-emerald-400 [animation-delay:0ms]" />
              <span className="inline-flex h-3 w-3 animate-bounce rounded-full bg-lime-400 [animation-delay:160ms]" />
              <span className="inline-flex h-3 w-3 animate-bounce rounded-full bg-emerald-300 [animation-delay:320ms]" />
            </div>

            <div>
              <p className="text-lg font-semibold text-emerald-50">While analyzing</p>
              <p className="mt-2 text-sm text-emerald-200/80">{loadingSteps[stepIndex]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
