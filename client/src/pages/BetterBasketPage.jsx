import BetterBasketHero from '../components/BetterBasketHero';
import BasketComparisonCards from '../components/BasketComparisonCards';
import SmartSwapEngine from '../components/SmartSwapEngine';
import ImpactSummary from '../components/ImpactSummary';
import BeforeAfterCharts from '../components/BeforeAfterCharts';
import BetterChoiceExplanation from '../components/BetterChoiceExplanation';
import EcoVoiceBasketAssistant from '../components/EcoVoiceBasketAssistant';
import ActionButtons from '../components/ActionButtons';
import BadgeRewardSection from '../components/BadgeRewardSection';

export default function BetterBasketPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <BetterBasketHero />
      <BasketComparisonCards />
      <ImpactSummary />
      <SmartSwapEngine />
      <BeforeAfterCharts />
      <BetterChoiceExplanation />
      <EcoVoiceBasketAssistant />
      <ActionButtons />
      <BadgeRewardSection />
    </section>
  );
}
