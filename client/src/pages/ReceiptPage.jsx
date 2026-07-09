import { useEffect, useState } from 'react';
import ReceiptSummary from '../components/ReceiptSummary';
import ReceiptValidation from '../components/ReceiptValidation';
import VoiceAssistant from '../components/VoiceAssistant';
import ReceiptUploader from '../components/ReceiptUploader';
import ManualBillEntry from '../components/ManualBillEntry';
import OCRPreview from '../components/OCRPreview';
import AnalysisPreview from '../components/AnalysisPreview';
import LoadingAnimation from '../components/LoadingAnimation';
import ActionButtons from '../components/ActionButtons';

export default function ReceiptPage() {
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const demoItems = ['Milk', 'Chicken', 'Plastic Bottle', 'Soft Drink', 'Rice', 'Soap'];

  useEffect(() => {
    if (!analyzing) return undefined;

    const timer = window.setInterval(() => {
      setStepIndex((value) => (value + 1) % 4);
    }, 1200);

    return () => window.clearInterval(timer);
  }, [analyzing]);

  function handleAnalyze() {
    setAnalyzing(true);
    setStepIndex(0);
    window.setTimeout(() => setAnalyzing(false), 4200);
  }

  function handleReset() {
    localStorage.removeItem('receiptDraft');
    setAnalyzing(false);
    setStepIndex(0);
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16" aria-label="Receipt analysis experience">
      <div className="mb-8">
        <div className="text-xs font-medium uppercase tracking-[0.35em] text-emerald-300">SECTION 13</div>
        <h1 className="mt-3 text-4xl font-semibold text-white">Premium receipt analysis experience</h1>
        <p className="mt-3 max-w-2xl text-emerald-100/70">A clean, reusable interface built with Tailwind CSS, Heroicons, React hooks, responsive grids, and motion placeholders.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReceiptUploader demoLoaded={demoLoaded} demoItems={demoItems} onLoadDemo={() => setDemoLoaded(true)} />
        <ManualBillEntry />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <OCRPreview items={demoLoaded ? demoItems : []} />
        <AnalysisPreview />
      </div>

      <div className="mt-6">
        <LoadingAnimation active={analyzing} stepIndex={stepIndex} />
      </div>

      <div className="mt-6">
        <ActionButtons onReset={handleReset} onAnalyze={handleAnalyze} analyzing={analyzing} />
      </div>

      <div className="mt-10 rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-8">
        <div className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-300">SECTION 11</div>
        <h2 className="mt-2 text-2xl font-semibold text-white">Accessibility</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Large buttons', 'Touch-friendly controls with generous spacing.'],
            ['Keyboard accessible', 'Focusable inputs and buttons with visible focus states.'],
            ['Screen reader labels', 'Clear labels and aria attributes for assistive tech.'],
            ['Dark Mode support', 'High-contrast visuals designed for low-light use.']
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-emerald-700/40 bg-emerald-900/70 p-4">
              <h3 className="text-lg font-semibold text-emerald-50">{title}</h3>
              <p className="mt-2 text-sm text-emerald-100/70">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <ReceiptSummary />
      <ReceiptValidation />
      <VoiceAssistant />
    </section>
  );
}
