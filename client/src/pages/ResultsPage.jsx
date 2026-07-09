import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { products as productCatalog } from '../data/products';
import ResultsHero from '../components/ResultsHero';
import ImpactScoreCards from '../components/ImpactScoreCards';
import ProductImpactTable from '../components/ProductImpactTable';
import BeforeAfterComparison from '../components/BeforeAfterComparison';
import ChartsSection from '../components/ChartsSection';
import TopProblemItems from '../components/TopProblemItems';
import AIRecommendationPanel from '../components/AIRecommendationPanel';
import EcoVoiceSummary from '../components/EcoVoiceSummary';
import EcoVoiceAssistant from '../components/EcoVoiceAssistant';
import ReportActions from '../components/ReportActions';
import { generateEcoLifePDF } from '../utils/reportGenerator';

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function findProductByName(name) {
  const normalizedName = normalizeText(name);
  return productCatalog.find((product) => {
    const productName = normalizeText(product.name);
    return productName === normalizedName || productName.includes(normalizedName) || normalizedName.includes(productName);
  });
}

function buildRecommendations(items) {
  const recommendations = [];

  items.forEach((item) => {
    const matched = findProductByName(item.name);
    if (!matched || !matched.alternativeId) return;
    const alternative = productCatalog.find((product) => product.id === matched.alternativeId);
    if (!alternative) return;

    const currentPrice = Number(item.price) || 0;
    const altPrice = Number(alternative.priceEstimate) || 0;
    const carbonSaved = Number(Math.max(0, item.carbonTotal - alternative.carbonFactor * item.quantity).toFixed(1));

    recommendations.push({
      currentProduct: item.name || 'Product',
      alternativeProduct: alternative.name,
      reason: alternative.reason || 'A more sustainable alternative.',
      carbonSaved,
      healthBenefit: alternative.healthScore != null ? `Health score may improve to ${alternative.healthScore}` : 'Healthier option',
      pollutionBenefit: alternative.pollutionScore != null ? `Lower pollution score possible` : 'Lower pollution impact',
      costNote: altPrice > 0 ? `Estimated cost ₹${altPrice}` : 'Better long-term value',
      currentHealth: item.healthScore,
      currentPollution: item.pollutionScore,
      currentPlastic: item.plasticScore,
      altHealth: alternative.healthScore,
      altPollution: alternative.pollutionScore,
      altPlastic: alternative.plasticScore,
      currentPrice,
      altPrice
    });
  });

  return recommendations;
}

function clamp(value, min = 0, max = 100) {
  if (typeof value !== 'number' || Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

export default function ResultsPage() {
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
      setLoadError('Unable to load your analysis. Please scan or enter a receipt first.');
    }
  }, []);

  const recommendations = useMemo(() => {
    if (!analysis) return [];
    return buildRecommendations(analysis.items);
  }, [analysis]);

  const summary = analysis?.summary;
  const totalCarbon = summary?.totalCarbon ?? 0;
  const healthScore = summary?.healthScore ?? 0;
  const pollutionScore = summary?.pollutionScore ?? 0;
  const plasticScore = summary?.plasticScore ?? 0;
  const totalCarbonSaved = recommendations.reduce((sum, item) => sum + (item.carbonSaved || 0), 0);
  const improvedCarbon = Number(Math.max(0, totalCarbon - totalCarbonSaved).toFixed(1));
  const carbonReduced = totalCarbon ? Math.round((totalCarbonSaved / totalCarbon) * 100) : 0;
  const healthScoreImproved = recommendations.length
    ? Math.round(recommendations.reduce((sum, item) => sum + Math.max(0, (item.altHealth || 0) - (item.currentHealth || 0)), 0) / recommendations.length)
    : 0;
  const plasticWasteReduced = recommendations.length
    ? Math.round(recommendations.reduce((sum, item) => sum + Math.max(0, (item.currentPlastic || 0) - (item.altPlastic || 0)), 0) / recommendations.length)
    : 0;
  const ecoLifeScore = clamp(Math.round((healthScore + (100 - pollutionScore) + (100 - plasticScore) + Math.max(0, 100 - totalCarbon * 10)) / 4));
  const treeEquivalent = Math.max(1, Math.round(totalCarbon / 0.4));
  const moneySavingPotential = Math.max(0, Math.round(recommendations.reduce((sum, item) => sum + Math.max(0, (item.currentPrice || 0) - (item.altPrice || 0)), 0)));

  const chartData = useMemo(() => {
    if (!analysis?.items?.length) return null;

    const categories = {};
    const health = { low: 0, medium: 0, high: 0 };
    const pollution = { low: 0, medium: 0, high: 0 };

    analysis.items.forEach((item) => {
      const label = item.category || 'Unknown';
      categories[label] = (categories[label] || 0) + (item.carbonTotal || 0);

      const healthScoreValue = item.healthScore ?? 0;
      if (healthScoreValue >= 70) health.low += 1;
      else if (healthScoreValue >= 40) health.medium += 1;
      else health.high += 1;

      const pollutionScoreValue = item.pollutionScore ?? 0;
      if (pollutionScoreValue <= 40) pollution.low += 1;
      else if (pollutionScoreValue <= 70) pollution.medium += 1;
      else pollution.high += 1;
    });

    return {
      categoryLabels: Object.keys(categories),
      categoryTotals: Object.values(categories).map((value) => Number(value.toFixed(1))),
      healthDistribution: [health.low, health.medium, health.high],
      pollutionDistribution: [pollution.low, pollution.medium, pollution.high],
      beforeAfter: [totalCarbon, improvedCarbon]
    };
  }, [analysis, totalCarbon, improvedCarbon]);

  const reportSummary = useMemo(() => {
    const lines = [];
    if (analysis) {
      lines.push('EcoLife Receipt Analysis Summary');
      lines.push(`Total CO2 Emission: ${totalCarbon.toFixed(1)} kg`);
      lines.push(`EcoLife Score: ${ecoLifeScore}/100`);
      lines.push(`Health Score: ${healthScore}/100`);
      lines.push(`Pollution Score: ${pollutionScore}/100`);
      lines.push(`Plastic Score: ${plasticScore}/100`);
      lines.push(`Tree Equivalent: ${treeEquivalent} trees`);
      lines.push(`Potential CO2 Saving: ${totalCarbonSaved.toFixed(1)} kg`);
      lines.push(`Money Saving Potential: ₹${moneySavingPotential}`);
      lines.push('Products:');
      analysis.items.forEach((item) => {
        lines.push(`- ${item.name}: ${item.quantity} × ₹${item.price} | ${item.carbonTotal.toFixed(1)} kg CO2`);
      });
    }
    return lines.join('\n');
  }, [analysis, totalCarbon, ecoLifeScore, healthScore, pollutionScore, plasticScore, treeEquivalent, totalCarbonSaved, moneySavingPotential]);

  const handleDownloadReport = async () => {
    await generateEcoLifePDF(analysis);
  };

  const handleShareReport = async () => {
    if (!analysis) {
      window.alert('No report available to share.');
      return;
    }

    const sharePayload = {
      title: 'EcoLife Receipt Report',
      text: reportSummary
    };

    if (navigator.share) {
      try {
        await navigator.share(sharePayload);
        return;
      } catch (error) {
        // Fall back to clipboard.
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(reportSummary);
      window.alert('Report summary copied to clipboard.');
      return;
    }

    window.alert('Unable to share report on this device.');
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

  if (!analysis) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 py-16">
        <div className="rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 p-10 text-center shadow-[0_20px_70px_rgba(3,20,13,0.2)]">
          <h2 className="text-3xl font-semibold text-white">No receipt analyzed yet.</h2>
          <p className="mt-3 text-lg text-emerald-100/70">Please scan or enter a receipt first.</p>
          {loadError ? <p className="mt-3 text-sm text-rose-300">{loadError}</p> : null}
          <div className="mt-6 flex justify-center">
            <Link
              to="/scanner"
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Go to Scanner
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap gap-3">
        <Link to="/basket" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400">
          {t('results.viewBetterBasket')}
        </Link>
        <Link to="/city" className="rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          {t('results.viewCityImpact')}
        </Link>
      </div>
      <ResultsHero />
      <ImpactScoreCards
        summary={{
          totalCarbon,
          ecoLifeScore,
          healthScore,
          pollutionScore,
          plasticScore,
          treeEquivalent,
          totalCarbonSaved,
          moneySavingPotential
        }}
      />
      <ProductImpactTable items={analysis.items} />
      <BeforeAfterComparison
        currentCarbon={totalCarbon}
        improvedCarbon={improvedCarbon}
        carbonReduced={carbonReduced}
        healthScoreImproved={healthScoreImproved}
        plasticWasteReduced={plasticWasteReduced}
      />
      <ChartsSection analysis={analysis} beforeAfter={{ currentCarbon: totalCarbon, improvedCarbon }} />
      <TopProblemItems />
      <AIRecommendationPanel recommendations={recommendations} />
      <EcoVoiceSummary />
      <EcoVoiceAssistant />
      <ReportActions
        onDownload={handleDownloadReport}
        onShare={handleShareReport}
        onSaveFamilyDashboard={handleSaveFamilyDashboard}
        onGoToBetterBasket={() => navigate('/basket')}
        onAnalyzeAnotherReceipt={() => navigate('/scanner')}
      />
    </section>
  );
}
