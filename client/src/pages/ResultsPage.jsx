import { Link } from 'react-router-dom';
import ResultsHero from '../components/ResultsHero';
import ImpactScoreCards from '../components/ImpactScoreCards';
import ProductImpactTable from '../components/ProductImpactTable';
import BeforeAfterComparison from '../components/BeforeAfterComparison';
import ChartsSection from '../components/ChartsSection';
import TopProblemItems from '../components/TopProblemItems';
import AIRecommendationPanel from '../components/AIRecommendationPanel';
import EcoVoiceSummary from '../components/EcoVoiceSummary';
import ReportActions from '../components/ReportActions';

const sampleData = {
  receiptItems: ['Milk', 'Chicken', 'Plastic Bottle', 'Soft Drink', 'Rice', 'Soap', 'Chips', 'Imported Apple'],
  analyzed: true
};

export default function ResultsPage() {
  if (!sampleData.analyzed) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 py-16">
        <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-10 text-center shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
          <h2 className="text-3xl font-semibold text-white">No receipt analyzed yet.</h2>
          <p className="mt-3 text-lg text-emerald-100/70">Please scan a receipt first.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap gap-3">
        <Link to="/basket" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400">
          View Better Basket
        </Link>
        <Link to="/city" className="rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          View City Impact
        </Link>
      </div>
      <ResultsHero />
      <ImpactScoreCards />
      <ProductImpactTable />
      <BeforeAfterComparison />
      <ChartsSection />
      <TopProblemItems />
      <AIRecommendationPanel />
      <EcoVoiceSummary />
      <ReportActions />
    </section>
  );
}
