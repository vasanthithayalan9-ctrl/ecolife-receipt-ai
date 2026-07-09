import { Link } from 'react-router-dom';
import CityImpactHero from '../components/CityImpactHero';
import SimulatorInputPanel from '../components/SimulatorInputPanel';
import CityImpactResults from '../components/CityImpactResults';
import CityBeforeAfterSection from '../components/CityBeforeAfterSection';
import CityMapPlaceholder from '../components/CityMapPlaceholder';
import CityActionPlan from '../components/CityActionPlan';
import EcoVoiceCityNarrator from '../components/EcoVoiceCityNarrator';
import CityReportActions from '../components/CityReportActions';

export default function CityImpactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap gap-3">
        <Link to="/results" className="rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          Back to Results
        </Link>
        <Link to="/basket" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400">
          View Better Basket
        </Link>
        <Link to="/family" className="rounded-full border border-emerald-500/30 bg-emerald-950/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          Family Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-white">City Impact Simulator</h2>
        <p className="mt-2 text-emerald-100/70">See how a greener shopping behavior shift can create measurable change at neighborhood and city scale.</p>
      </div>

      <CityImpactHero />
      <SimulatorInputPanel />
      <CityImpactResults />
      <CityBeforeAfterSection />
      <CityMapPlaceholder />
      <CityActionPlan />
      <EcoVoiceCityNarrator />
      <CityReportActions />
    </section>
  );
}
