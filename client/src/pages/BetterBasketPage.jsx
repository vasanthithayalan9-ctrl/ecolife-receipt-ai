import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { products as productCatalog } from '../data/products';
import BetterBasketHero from '../components/BetterBasketHero';
import BasketComparisonCards from '../components/BasketComparisonCards';
import SmartSwapEngine from '../components/SmartSwapEngine';
import ImpactSummary from '../components/ImpactSummary';
import BeforeAfterCharts from '../components/BeforeAfterCharts';
import BetterChoiceExplanation from '../components/BetterChoiceExplanation';
import EcoVoiceBasketAssistant from '../components/EcoVoiceBasketAssistant';
import ActionButtons from '../components/ActionButtons';
import BadgeRewardSection from '../components/BadgeRewardSection';
import EcoVoiceAssistant from '../components/EcoVoiceAssistant';
import { generateEcoLifePDF } from '../utils/reportGenerator';

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function findProductByName(name) {
  const normalized = normalizeText(name);
  return productCatalog.find((product) => {
    const productName = normalizeText(product.name);
    return productName === normalized || productName.includes(normalized) || normalized.includes(productName);
  });
}

function buildRecommendation(item) {
  const product = findProductByName(item.name);
  if (!product || !product.alternativeId) return null;
  const alternative = productCatalog.find((entry) => entry.id === product.alternativeId);
  if (!alternative) return null;

  const quantity = Number(item.quantity) || 1;
  const currentPrice = Number(item.price) || 0;
  const betterCarbon = Number(((alternative.carbonFactor || 0) * quantity).toFixed(1));
  const co2Saved = Number(Math.max(0, (item.carbonTotal || 0) - betterCarbon).toFixed(1));
  const altPrice = Number(alternative.priceEstimate) || 0;
  const costDifference = Number(((altPrice * quantity) - currentPrice).toFixed(0));

  return {
    from: item.name || 'Product',
    to: alternative.name,
    quantity,
    currentCarbon: Number(item.carbonTotal || 0),
    betterCarbon,
    co2Saved,
    healthBenefit: alternative.healthScore != null ? `Health score may improve to ${alternative.healthScore}` : 'Healthier option',
    pollutionBenefit: alternative.pollutionScore != null ? `Pollution score may improve to ${alternative.pollutionScore}` : 'Lower pollution impact',
    costNote: costDifference < 0 ? `₹${Math.abs(costDifference)} saved` : `₹${costDifference} more`,
    reason: alternative.reason || 'A more sustainable choice.',
    currentHealth: item.healthScore || 0,
    currentPollution: item.pollutionScore || 0,
    currentPlastic: item.plasticScore || 0,
    altHealth: alternative.healthScore || 0,
    altPollution: alternative.pollutionScore || 0,
    altPlastic: alternative.plasticScore || 0,
    currentPrice,
    altPrice
  };
}

function formatCurrency(value) {
  const number = Number(value);
  return Number.isFinite(number) ? `₹${number}` : '₹0';
}

export default function BetterBasketPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ecolife_analysis');
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (!parsed || !Array.isArray(parsed.items) || typeof parsed.summary !== 'object') {
        throw new Error('Invalid analysis data');
      }
      setAnalysis(parsed);
    } catch (error) {
      setLoadError('Unable to load analysis. Please scan or enter a receipt first.');
    }
  }, []);

  const recommendations = useMemo(() => {
    if (!analysis?.items?.length) return [];
    return analysis.items.map(buildRecommendation).filter(Boolean);
  }, [analysis]);

  const currentItems = useMemo(() => {
    if (!analysis?.items?.length) return [];

    return analysis.items.map((item) => ({
      name: item.name || 'Unknown',
      quantity: item.quantity || 0,
      carbon: `${Number(item.carbonTotal || 0).toFixed(1)} kg`,
      health: item.healthScore != null ? `${item.healthScore}/100` : 'N/A',
      pollution: item.pollutionScore != null ? `${item.pollutionScore}/100` : 'N/A',
      price: formatCurrency(item.price)
    }));
  }, [analysis]);

  const betterItems = useMemo(() => {
    return recommendations.map((recommendation) => ({
      name: recommendation.to,
      quantity: recommendation.quantity,
      carbon: `${recommendation.betterCarbon.toFixed(1)} kg`,
      health: recommendation.altHealth ? `${recommendation.altHealth}/100` : 'N/A',
      pollution: recommendation.altPollution ? `${recommendation.altPollution}/100` : 'N/A',
      price: formatCurrency(recommendation.altPrice)
    }));
  }, [recommendations]);

  const summary = useMemo(() => {
    const totalCurrentCarbon = Number(analysis?.summary?.totalCarbon || 0);
    const totalBetterCarbon = recommendations.reduce((sum, item) => sum + (item.betterCarbon || 0), 0);
    const co2Saved = Number(Math.max(0, totalCurrentCarbon - totalBetterCarbon).toFixed(1));
    const carbonReduction = totalCurrentCarbon ? Math.round((co2Saved / totalCurrentCarbon) * 100) : 0;
    const totalCurrentPrice = analysis?.items?.reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 0;
    const totalBetterPrice = recommendations.reduce((sum, item) => sum + ((item.altPrice || 0) * item.quantity), 0);
    const moneyDifference = Number((totalBetterPrice - totalCurrentPrice).toFixed(0));
    const healthImprovement = recommendations.length
      ? Math.round(
          recommendations.reduce((sum, item) => sum + Math.max(0, (item.altHealth || 0) - (item.currentHealth || 0)), 0) / recommendations.length
        )
      : 0;
    const plasticImprovement = recommendations.length
      ? Math.round(
          recommendations.reduce((sum, item) => sum + Math.max(0, (item.currentPlastic || 0) - (item.altPlastic || 0)), 0) / recommendations.length
        )
      : 0;
    const treeEquivalent = Math.max(0, Math.round(co2Saved / 0.4));

    return {
      totalCurrentCarbon,
      totalBetterCarbon,
      co2Saved,
      carbonReduction,
      healthImprovement,
      plasticImprovement,
      moneyDifference,
      moneyLabel: moneyDifference < 0 ? `₹${Math.abs(moneyDifference)} saved` : `₹${moneyDifference} more`,
      treeEquivalent
    };
  }, [analysis, recommendations]);

  const handleAcceptBetterBasket = () => {
    if (!analysis) {
      window.alert('No analysis available to accept.');
      return;
    }

    try {
      const accepted = JSON.parse(localStorage.getItem('ecolife_accepted_basket') || '[]');
      const nextAccepted = Array.isArray(accepted) ? accepted : [];
      nextAccepted.push({ acceptedAt: Date.now(), recommendations, summary, analysis });
      localStorage.setItem('ecolife_accepted_basket', JSON.stringify(nextAccepted));

      const habitHistory = JSON.parse(localStorage.getItem('ecolife_habit_history') || '[]');
      const nextHabitHistory = Array.isArray(habitHistory) ? habitHistory : [];
      nextHabitHistory.push({
        timestamp: Date.now(),
        acceptedCount: recommendations.length,
        co2Saved: summary.co2Saved,
        carbonReduction: summary.carbonReduction,
        moneyDifference: summary.moneyDifference
      });
      localStorage.setItem('ecolife_habit_history', JSON.stringify(nextHabitHistory));

      window.alert('Better basket accepted successfully.');
    } catch (error) {
      window.alert('Unable to save the accepted basket.');
    }
  };

  const handleSaveFamilyDashboard = () => {
    if (!analysis) {
      window.alert('No analysis available to save.');
      return;
    }

    try {
      const existing = localStorage.getItem('ecolife_family_history');
      const parsed = existing ? JSON.parse(existing) : [];
      const history = Array.isArray(parsed) ? parsed : [];
      const nextHistory = [...history, { ...analysis, savedAt: Date.now() }];
      localStorage.setItem('ecolife_family_history', JSON.stringify(nextHistory));
      window.alert('Analysis saved to family dashboard.');
    } catch (error) {
      window.alert('Unable to save analysis for family dashboard.');
    }
  };

  const handleDownloadBasketReport = async () => {
    await generateEcoLifePDF(analysis);
  };

  const handleViewCityImpact = () => {
    navigate('/city');
  };

  const handleBackToResults = () => {
    navigate('/results');
  };

  if (!analysis) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 py-16">
        <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-10 text-center shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
          <h2 className="text-3xl font-semibold text-white">No receipt analyzed yet.</h2>
          <p className="mt-3 text-lg text-emerald-100/70">Please scan or enter a receipt first.</p>
          {loadError ? <p className="mt-3 text-sm text-rose-300">{loadError}</p> : null}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/scanner')}
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Go to Scanner
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <BetterBasketHero />
      <BasketComparisonCards currentItems={currentItems} betterItems={betterItems} />
      <ImpactSummary summary={summary} />
      <SmartSwapEngine recommendations={recommendations} />
      <BeforeAfterCharts
        currentCarbon={summary.totalCurrentCarbon}
        betterCarbon={summary.totalBetterCarbon}
        healthChange={summary.healthImprovement}
        pollutionChange={summary.plasticImprovement}
      />
      <BetterChoiceExplanation />
      <EcoVoiceBasketAssistant />
      <EcoVoiceAssistant />
      <ActionButtons
        onAcceptBetterBasket={handleAcceptBetterBasket}
        onSaveFamilyDashboard={handleSaveFamilyDashboard}
        onViewCityImpact={handleViewCityImpact}
        onDownloadBasketReport={handleDownloadBasketReport}
        onBackToResults={handleBackToResults}
      />
      <BadgeRewardSection />
    </section>
  );
}
